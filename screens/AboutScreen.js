import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const AboutScreen = () => {
  return (
    <View style={{backgroundColor: 'black', flex: 1}}></View>
  )
};

AboutScreen.navigationOptions ={
  headerTitle: 'About',
  headerStyle: {
	backgroundColor: 'black'
  },
  headerTintColor: 'white'
};

const styles = StyleSheet.create({});

export default AboutScreen;