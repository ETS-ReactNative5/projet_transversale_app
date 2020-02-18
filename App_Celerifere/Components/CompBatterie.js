// Components/CompBatterie.js

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View, Image } from 'react-native';
import { getBatterie } from './testEnvoi.js'

export default class CompBatterie extends Component {

  _onLongPressButton() {
    alert('Apperçu rapide info avancées\n\nEstimation Batterie :\t\t\t\t--km\nDistance restante :\t\t\t\t\t--km')
  }


  render() {
    return (
      <View style={styles2.container}>
        <TouchableNativeFeedback
            onLongPress={this._onLongPressButton}
            background={Platform.OS === 'android' ? TouchableNativeFeedback.SelectableBackground() : ''}>
          <View style={styles2.batterie}>
            <View style={styles2.niveau}/>
            <View style={styles2.vide}/>
          </View>
        </TouchableNativeFeedback>
      </View>
    );
  }
}

const styles2 = StyleSheet.create({
  container: {
    paddingTop: 60,
    alignItems: 'center'
  },
  batterie: {
    flexDirection: 'row',
    padding: 10,
    width: 200,
    height: 80,
    backgroundColor: '#808097',
    borderColor: '#000000',
    borderWidth: 2,
    borderRadius:30

  },
  niveau: {
    flex: 4,
    height: 55,
    backgroundColor: '#50FF50',
    borderRadius:10
  },

  vide: {
    flex: 2,
    height: 55,
    backgroundColor: '#505050',
    borderRadius:10

  }
});
