import Geolocation from 'react-native-geolocation-service'
import MapView, {Marker} from 'react-native-maps'
import React, { Component } from 'react';
import {
  PermissionsAndroid,
	StyleSheet,
	Text,
	View,
	Alert
} from 'react-native';

const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;
var allowLocation;

async function requestLocationPermission() {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Cool GPS App Location Permission',
        message:
          'Cool GPS App needs access to your GPS ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
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

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latlng:{
        latitude: 0,
        longitude: 0
      }
    };
  }


	findCoordinates = () => {
    requestLocationPermission()
    if(allowLocation = true){
  		Geolocation.getCurrentPosition(
  			position => {
          const {latitude, longitude} = position.coords;
          this.setState({latlng:{latitude, longitude}});
  			},
  			error => Alert.alert(error.message),
  			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  		);
    }
	};

  componentDidMount(){
    this.findCoordinates()
  };

	render() {
		return (
			<View style={styles.container}>
        <MapView
          style={{flex: 1}}
          region={{
            latitude: this.state.latlng.latitude,
            longitude: this.state.latlng.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          }}
        >
        <Marker
          coordinate={this.state.latlng}
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
});
