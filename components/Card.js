import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

import FormatNumber from './NumFormat';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const Card = (props) => {
  return (
    <View style={{...styles.cardContainer, height: (screenHeight/100)*18 }}>
	  <Text style={{color: props.color, fontSize: 12}}>{props.tag}</Text>
	  <Text style={styles.stats} numberOfLines={2}>{FormatNumber(props.stats)}</Text>
      <Text style={{...styles.change, color: props.color }}>
		{props.sign}
		{props.change}
	  </Text>
	</View>
  )
};

const styles = StyleSheet.create({
  cardContainer: {
	marginTop: 10,
	width: '49%',
    backgroundColor: '#263238',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 10,
	elevation: 10
  },
  stats: {
	color: 'white',
	fontSize: 20
  },
  change: {
	fontSize: 12,
	flexDirection: 'row'
  }
});

export default Card;
