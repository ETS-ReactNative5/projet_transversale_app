
import React from 'react'
import Map from './Components/Map'
import { StyleSheet, View, Text, Button} from 'react-native'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.main_container}>
        <View style={styles.haut_ecran}>
          <Map/>
        </View>
        <View style={styles.bas_ecran}>
          <View style={styles.batterie_boutons}>
            <Button title='Config' onPress={() => {}}/>
            <Text style={styles.text_batterie}>{'Batterie'}</Text>
            <Button title='Infos Avancées' onPress={() => {}}/>
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
    backgroundColor: '#ccffff'
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
