import React from 'react'
import 'react-native-gesture-handler'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Map from './Components/Map'
import Config from './Components/Config'
import InfoAvanc from './Components/InfoAvanc'
import Localisation from './Components/Localisation'
import { StyleSheet, View, Text, Button} from 'react-native'
import CompVitesse from './Components/CompVitesse'
import CompBatterie from './Components/CompBatterie'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.haut_ecran}>
          <Map/>
        </View>
        <View style={styles.bas_ecran}>
          <View style={styles.batterie_boutons}>
            <Button title='Config' onPress={() => {navigation.navigate('Config')}}/>
            <CompVitesse/>
            <Button title='Infav' onPress={() => {navigation.navigate('InfoAvanc')}}/>
          </View>
          <CompBatterie style={styles.CompBatterie}/>
          <Text style={styles.texts}>{'A Propos'}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: '#909090'
  },
  haut_ecran: {
    flex: 2,
    marginHorizontal: 10,
    marginVertical: 5,
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

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen  name="Accueil"  component={App}}  />
        <Stack.Screen  name="Réglages"  component={Config}}  />
        <Stack.Screen  name="Localisation"  component={Localisation}}  />
        <Stack.Screen  name="Infos Avancées"  component={InfoAvanc}}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
