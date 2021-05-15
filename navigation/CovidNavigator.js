import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
//local
import IndianScreen from '../screens/IndianScreen';
import WorldScreen from '../screens/WorldScreen';
import StateScreen from '../screens/StateScreen';
import CountryScreen from '../screens/CountryScreen';
import DistrictScreen from '../screens/DistrictScreen';
import StateDataScreen from '../screens/StateDataScreen';
import DistrictDataScreen from '../screens/DistrictDataScreen';
import CountryDataScreen from '../screens/CountryDataScreen';
import AboutScreen from '../screens/AboutScreen';

const CovidNavigator = createStackNavigator({
  India: IndianScreen,
  StateData: StateDataScreen,
  State: StateScreen,
  DistrictData: DistrictDataScreen,
  District: DistrictScreen,
  World: WorldScreen,
  CountryData: CountryDataScreen,
  Country: CountryScreen,
  About: AboutScreen
});

export default createAppContainer(CovidNavigator);