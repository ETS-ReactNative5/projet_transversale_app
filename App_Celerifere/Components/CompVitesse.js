// Components/CompVitesse.js

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';
import { getVitesse } from './testEnvoi'

export default class CompVitesse extends Component {

  _onLongPressButton() {
    alert('Apperçu rapide info avancées\n\nVitesse moyenne :\t\t\t\t\t--km/h\nDistance parcourue :\t\t--km')
  }


  render() {
    return (
      <View style={styles1.container}>
        <TouchableNativeFeedback
            onLongPress={this._onLongPressButton}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
          <View style={styles1.button}>
            <Text style={styles1.buttonText1}>{getVitesse()}{Platform.OS !== 'android' ? '(Android only)' : ''}</Text>
            <Text style={styles1.buttonText2}>km/h{Platform.OS !== 'android' ? '(Android only)' : ''}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles1 = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  button: {
    //flex: 1,
    flexDirection: 'row',
    //marginBottom: 30,
    width: 200,
    height: 80,
    //alignItems: 'center',
    backgroundColor: '#808097',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius:30

  },
  buttonText1: {
    flex: 5,
    alignItems: 'stretch',
    textAlign: 'center',
    color: 'white',
    fontSize: 70,
    fontStyle: 'italic'
  },
  buttonText2: {
    flex: 2,
    textAlign: 'left',
    padding: 15,
    color: 'white',
    fontSize: 20,
    fontStyle: 'italic'
  }
});
