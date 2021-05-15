import React from 'react';
import {View, Text, ScrollView, StyleSheet, Dimensions} from 'react-native';
//local
import PieChart from '../components/PieChart';
import Card from '../components/Card';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const CountryScreen = (props) => {
  const confirmed = props.navigation.getParam('confirmed');
  const dconfirmed = props.navigation.getParam('dconfirmed');
  const active = props.navigation.getParam('active');
  const recovered = props.navigation.getParam('recovered');
  const drecovered = props.navigation.getParam('drecovered');
  const decreased = props.navigation.getParam('decreased');
  const ddecreased = props.navigation.getParam('ddecreased');
  const tests = props.navigation.getParam('tests');
	
  return (
    <ScrollView style={styles.container}>
      <View style={styles.chartSection}>
	    <View>
		  <PieChart
			active={active}
			recovered={recovered}
			decreased={decreased}
		  />
		</View>
		<View>
		  <Text style={{color: 'white'}}><Text style={{color: '#2979FF'}}>◘</Text> Active</Text>
		  <Text style={{color: 'white'}}><Text style={{color: '#00C853'}}>◘</Text> Recovered</Text>
		  <Text style={{color: 'white'}}><Text style={{color: '#ff5252'}}>◘</Text> Decreased</Text>
		</View>
	  </View>
	  <View style={styles.card}>
	    <Card pad={50} tag='Confirmed' color='#FBC02D' stats={confirmed} change={dconfirmed} sign="+" />
		<Card pad={50} tag='Active' color='#80DEEA' stats={active}  />
	  </View>
	  <View style={styles.card}>
	    <Card pad={50} tag='Recovered' color='#8BC34A' stats={recovered} change={drecovered} sign="+" />
		<Card pad={50} tag='Decreased' color='#FF5252' stats={decreased} change={ddecreased} sign="+" />
	  </View>
	  <View style={styles.bottomCardSection}>
	    <View style={styles.bottomCard}>
		  <Text style={{color: '#F06292'}}>Total tests</Text>
		  <Text style={{color: 'white'}}>{tests}</Text>
		</View>
	  </View>
    </ScrollView>
  );
};

CountryScreen.navigationOptions = navigationData => {
    const title = navigationData.navigation.getParam('countryName');
	
	return {
	  headerTitle: title,
	  headerStyle: {
		backgroundColor: 'black'
	  },
	  headerTintColor: 'white'
	}
};

const styles = StyleSheet.create({
  container: {
	padding: 10,
	backgroundColor: 'black',
  },
  chartSection: {
	flexDirection: 'row',
	justifyContent: 'space-around',
	backgroundColor: '#263238',
	borderRadius: 10,
	padding: 10,
	alignItems: 'center',
	height: (screenHeight/100)*30
  },
  card: {
	flexDirection: 'row',
	justifyContent: 'space-between'
  },
  bottomCardSection: {
	flex: 1,
	justifyContent: 'space-around',
	marginBottom: 10
  },
  bottomCard: {
	marginTop: 10,
    backgroundColor: '#263238',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 10,
	padding: 20,
	height: (screenHeight/100)*12
  }
});

export default CountryScreen;
