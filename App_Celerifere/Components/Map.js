/*
import Geolocation from 'react-native-geolocation-service'
import MapView, {Marker, AnimatedRegion, PROVIDER_GOOGLE} from 'react-native-maps'
import haversine from 'haversine';
import React, { Component } from 'react';
import {
  PermissionsAndroid,
  Platform,
	StyleSheet,
	Text,
	View,
	Alert
} from 'react-native';

const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;



export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: LATITUDE,
      longitude: LONGITUDE,
      distanceTravelled: 0,
      prevLatLng: {},
      coordinate: new AnimatedRegion({
       latitude: LATITUDE,
       longitude: LONGITUDE
      })
    };
  }

  componentDidMount() {
    requestLocationPermission()
    if(allowLocation = true){
      this.watchID = Geolocation.watchPosition(
        position => {
          const { coordinate, distanceTravelled } = this.state;
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
           }       this.setState({
             latitude,
             longitude,
             distanceTravelled: distanceTravelled + this.calcDistance(newCoordinate),
             prevLatLng: newCoordinate
           });
         },
         error => console.log(error),
         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }
      );
    }
  }

  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }

  calcDistance = newLatLng => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

  getMapRegion = () => ({
    latitude: this.state.latitude,
    longitude: this.state.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA
  });

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
      </View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: '#F5FCFF'
	},
  map: {
		flex: 1
	},
});
*/

import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from "react-native";
import MapView, {
  Marker,
  AnimatedRegion,
  Polyline,
  PROVIDER_GOOGLE
} from "react-native-maps";
import Geolocation from 'react-native-geolocation-service'
import haversine from "haversine";

const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;
const LATITUDE = 0;
const LONGITUDE = 0;
var allowLocation;

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
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.bubble, styles.button]}>
            <Text style={styles.bottomBarContent}>
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
    ...StyleSheet.absoluteFillObject,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.7)",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: "center",
    marginHorizontal: 130
  },
  buttonContainer: {
    flexDirection: "row",
    marginVertical: 10,
    backgroundColor: "transparent"
  }
});

export default Map;
