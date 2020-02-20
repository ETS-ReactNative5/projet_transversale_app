import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, PermissionsAndroid, TextInput, Button, Dimensions, Switch } from 'react-native';
import MapView, {Marker,AnimatedRegion,PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import DarkMap from '../Helpers/DarkMap';
import AsyncStorage from '@react-native-community/async-storage';
//import MapViewDirections from 'react-native-maps-directions';
//import Geocoder from 'react-native-geocoding';
import haversine from 'haversine';

const { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const LATITUDE = 0;
const LONGITUDE = 0;
const KEY = 'KEY';
var allowLocation;
//Geocoder.init("AIzaSyCO7AqtE0nyLSvL9gOdZVPlpuQ-Lq8i-Hs");



class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dayNight: 0,
      mapStyle: [],
      stopRefreshingMap: 0,
      latitude: LATITUDE,
      longitude: LONGITUDE,
      distanceTravelled: this._restoreItem(),
      prevLatLng: {},
      coordinate: new AnimatedRegion({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      })
    };
  };

  async _requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the GPS');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  componentDidMount() {
    this._requestLocationPermission();
    this._followPosition();
  }

  componentDidUpdate() {
    this._saveItem();
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  _followPosition(){
    const { coordinate } = this.state;
      this.watchID = Geolocation.watchPosition(
        position => {
          const { distanceTravelled } = this.state;
          const { latitude, longitude } = position.coords;

          const newCoordinate = {
            latitude,
            longitude
          };

          if (Platform.OS === 'android') {
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
              distanceTravelled + this._calcDistance(newCoordinate),
            prevLatLng: newCoordinate
          });
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

  _getMapRegion(){
      if(this.state.stopRefreshingMap==0){
        return({
          latitude: this.state.latitude,
          longitude: this.state.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA
        })
      }
  };

  _calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  _setMapStyle(){
    if(this.state.mapStyle == DarkMap){
      this.setState({mapStyle: [null], dayNight: false});
    }else {
      this.setState({mapStyle: DarkMap, dayNight: true});
    };
  };

  async _saveItem(){
    try {
      await AsyncStorage.setItem(KEY, JSON.stringify(this.state.distanceTravelled));
    } catch (e) {
      console.warn(e);
    }
  };

  async _restoreItem(){
    let storedItem = {};
    try {
      storedItem = await AsyncStorage.getItem(KEY);
    } catch (e) {
      console.warn(e);
    }
    if(storedItem){
      this.setState({distanceTravelled: JSON.parse(storedItem)});
    }else{
      this.setState({distanceTravelled: 0});
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          loadingEnabled
          showsMyLocationButton
          region= {this._getMapRegion()}
          customMapStyle={this.state.mapStyle}
          onRegionChange={() => {this.setState({stopRefreshingMap: 1})}}
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
          <View style={styles.infosBas}>
            <TouchableOpacity style={styles.bubble}>
              <Text>
                {parseFloat(this.state.distanceTravelled).toFixed(2)} km
              </Text>
            </TouchableOpacity>
            <Switch
              value={this.state.dayNight}
              onValueChange={() => {this._setMapStyle()}}
            />
            <Button
              title='Moi'
              onPress={() => {this.setState({stopRefreshingMap: 0})}}
            />
          </View>
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
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 20,
    alignItems: 'center',
    alignSelf: 'center'
  },
  items: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  textinput: {
    backgroundColor: 'rgba(255,255,255,0.7)',
    marginLeft: 50,
    marginRight: 5,
    borderColor: 'black',
    borderWidth: 2,
    paddingLeft: 10
  },
  infosBas: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 50,
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
