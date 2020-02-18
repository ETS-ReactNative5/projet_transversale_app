//Components/testEnvoi.js

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, TouchableHighlight, TouchableOpacity, TouchableNativeFeedback, TouchableWithoutFeedback, View } from 'react-native';

//envoie d'une donnée de vitesse en char
export function getVitesse(){
  return '25';
}

//envoie d'une donnée de batterie en int
export function getBatterie(){
  return 30;
}

export default class testEnvoi extends Component {

}
