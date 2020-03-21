import React from 'react'
import {getTotalDistance} from './Map'
import { StyleSheet, View, Text, Button} from 'react-native'


class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalDistance: 0
    }
  }

  componentDidMount(){
    this.totalDistance = getTotalDistance();
  }

  render() {
    return(
      <Text>
        {parseFloat(this.totalDistance).toFixed(2)} km
      </Text>
    )
  }
}
export default Test;
