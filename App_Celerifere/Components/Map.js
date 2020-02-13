import React from "react";
import {StyleSheet,View,Text,TouchableOpacity,Platform,PermissionsAndroid,TextInput} from "react-native";
import MapView, {Marker,AnimatedRegion,Polyline,PROVIDER_GOOGLE} from "react-native-maps";
import Geolocation from 'react-native-geolocation-service'
//import MapViewDirections from 'react-native-maps-directions';
//import Geocoder from 'react-native-geocoding';
import haversine from "haversine";

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 0;
const LONGITUDE = 0;
var allowLocation;
var totalDistance;
//Geocoder.init("AIzaSyCO7AqtE0nyLSvL9gOdZVPlpuQ-Lq8i-Hs");

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the GPS');
      allowLocation = true;
    } else {
      console.log('Location permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
}

export function getTotalDistance(){
  return totalDistance;
}

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: 0,
        longitudeDelta: 0
      })
    };
  }

  componentDidMount() {
    const { coordinate } = this.state;
    requestLocationPermission()
    if(allowLocation = true){
      this.watchID = Geolocation.watchPosition(
        position => {
          const { distanceTravelled } = this.state;
          const { latitude, longitude } = position.coords;

          const newCoordinate = {
            latitude,
            longitude
          };

          if (Platform.OS === "android") {
            if (this.marker) {
              this.marker._component.animateMarkerToCoordinate(
                newCoordinate,
                500
              );
            }
          } else {
            coordinate.timing(newCoordinate).start();
          }

          this.setState({
            latitude,
            longitude,
            distanceTravelled:
              distanceTravelled + this.calcDistance(newCoordinate),
            prevLatLng: newCoordinate
          });
          totalDistance = this.distanceTravelled;
        },
        error => console.log(error),
        {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000,
          distanceFilter: 10
        }
      );
    }
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showUserLocation
          followUserLocation
          loadingEnabled
          region={this.getMapRegion()}
        >
          <Marker.Animated
            ref={marker => {
              this.marker = marker;
            }}
            coordinate={this.state.coordinate}
          />
        </MapView>
        <View style={styles.items}>
          <TextInput
            style={styles.textinput}
            placeholder='Destination'
            autoCompleteType= 'street-address'
          />
          <TouchableOpacity style={styles.bubble}>
            <Text>
              {parseFloat(this.state.distanceTravelled).toFixed(2)} km
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingVertical: 10,
    borderRadius: 20,
    marginHorizontal: 120,
    alignItems: "center"
  },
  items: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  textinput: {
    backgroundColor: "rgba(255,255,255,0.7)",
    marginLeft: 5,
    marginRight: 5,
    borderColor: 'black',
    borderWidth: 2,
    paddingLeft: 10
  }
});

export default Map;
/* A TERME :
Geocoder.from("Colosseum")
    .then(json => {
        var location = json.results[0].geometry.location;
        console.log(location);
    })
    .catch(error => console.warn(error));

<MapViewDirections
  origin={this.getMapRegion()}
  destination={{latitude: 47.241701, longitude: -1.529026}}
  apikey={'AIzaSyCO7AqtE0nyLSvL9gOdZVPlpuQ-Lq8i-Hs'}
/>
*/
