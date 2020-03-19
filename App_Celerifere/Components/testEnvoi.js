//Components/testEnvoi.js

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';

//envoie d'une donnée de vitesse en char
export function getVitesse(){

  return '0'; //vitesse exprimée km/h
}

//envoie d'une donnée de batterie en int
export function getBatterie(){
  return 30; //niveau exprimé en %
}

export default class testEnvoi extends Component {

}
