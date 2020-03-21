import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import { StyleSheet, View, Text, Button, ScrollView} from 'react-native'
import Localisation from './Components/Localisation'
import App from './App'
export default class InfoAvanc extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.ecran_vitesse}>
        // INFOS VITESSE//
        </View>
        <View style={styles.ecran_batterie}>
        // INFOS Batterie//
        </View>
        <View style={styles.bas_ecran}>
          <View style={styles.batterie_boutons}>
            <Button title='Accueil' onPress={() => {navigation.navigate('App')}}/>
            <Text style={styles.text_batterie}>{'Batterie'}</Text>
            <Button title='Loc' onPress={() => {navigation.navigate('Localisation')}}/>
          </View>
          <Text style={styles.texts}>{'Vitesse'}</Text>
          <Text style={styles.texts}>{'A Propos'}</Text>
        </View>
      </View>
    )

    )
  }
}
const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#99CCCC'
  },
  ecran_vitesse: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  ecran_batterie: {
    flex: 1,
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
