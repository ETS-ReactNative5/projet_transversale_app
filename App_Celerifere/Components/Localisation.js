//import 'react-native-gesture-handler'
import React, { Component } from 'react';
import {NavigationContainer} from '@react-navigation/native'
import Config from './Config'
import InfoAvanc from './InfoAvanc'
import App from '../App'
import { StyleSheet, View, Text, Button} from 'react-native'

import CompVitesse from './CompVitesse'
import CompBatterie from './CompBatterie'

export default class Localisation extends Component {
  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.haut_ecran}>
      <Text style={styles.text_batterie}>{' PARTIE CONFIG DE FADI SHALTAN'}</Text>
        </View>
        <View style={styles.bas_ecran}>
          <View style={styles.batterie_boutons}>
            <Button title='Infos Avancées' onPress={() => {navigation.navigate('InfoAvanc')}}/>
            <CompVitesse/>
            <Button title='Réglages' onPress={() => navigation.navigate('Config')}/>
          </View>
          <Text style={styles.texts}>{'Vitesse'}</Text>
          <Text style={styles.texts}>{'A Propos'}</Text>
        </View>
      </View>
    )

  }
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#99CCCC'
  },
  haut_ecran: {
    flex: 2,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  bas_ecran: {
    flex: 1,
    alignItems:'center',            //x
    justifyContent: 'space-around'  //y
  },
  batterie_boutons: {
    flex: 1,
    flexDirection: 'row',
    alignItems:'center',            //y
    marginHorizontal: 15
  },
  text_batterie: {
    paddingHorizontal: 5,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginHorizontal: 50,
  },
  texts: {
    flex: 1,
    paddingHorizontal: 25,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: 10
  },
  text_GPS: {
    flex: 1,
    borderColor: '#000000',
    borderWidth: 1,
    borderRadius: 5,
    textAlign: 'center',
    textAlignVertical: 'center'
  }
})
