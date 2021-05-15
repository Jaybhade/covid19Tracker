import React from 'react';
import {
	View, 
	Text, 
	ScrollView, 
	StyleSheet, 
	TouchableNativeFeedback,
	Dimensions,
	ActivityIndicator
  } from 'react-native';
//local
import PieChart from '../components/PieChart';
import Card from '../components/Card';
import FormatNumber from '../components/NumFormat';

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;

const WorldScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState({});



  const loader = React.useCallback(async () => {
	var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	await fetch("https://corona.lmao.ninja/v2/all?yesterday", requestOptions)
	  .then(response => response.json())
	  .then(result => setData(result))
	  .catch(error => console.log('error', error));
  }, []);

  React.useEffect(() => {
    setIsLoading(true);
    loader().then(() => {
      setIsLoading(false);
    });
  }, [loader])
  
  if(isLoading){
	  return(
	    <View style={styles.indicator}>
		  <ActivityIndicator size="large" color="white" />
		</View>
	  )
  }
  
  const Comp = () => {
	  return (
	    <PieChart
			active={data.active}
			recovered={data.recovered}
			decreased={data.deaths}
		  />
	  )
  }
	
  return (
    <ScrollView style={styles.container}>
      <View style={styles.chartSection}>
	    <View>
		  <Comp />
		</View>
		<View>
		  <Text style={{color: 'white'}}><Text style={{color: '#2979FF'}}>◘</Text> Active</Text>
		  <Text style={{color: 'white'}}><Text style={{color: '#00C853'}}>◘</Text> Recovered</Text>
		  <Text style={{color: 'white'}}><Text style={{color: '#ff5252'}}>◘</Text> Decreased</Text>
		</View>
	  </View>
	  <View style={styles.card}>
	    <Card pad={45} tag='Confirmed' color='#FBC02D' stats={data.cases} sign="+" change={FormatNumber(data.todayCases)} />
		<Card pad={45} tag='Active' color='#80DEEA' stats={data.active}/>
	  </View>
	  <View style={styles.card}>
	    <Card pad={45} tag='Recovered' color='#8BC34A' stats={data.recovered} change={FormatNumber(data.todayRecovered)} sign="+"/>
		<Card pad={45} tag='Decreased' color='#FF5252' stats={data.deaths} change={FormatNumber(data.todayDeaths)} sign="+" />
	  </View>
	  <View style={styles.bottomCardSection}>
	    <View style={styles.bottomCard}>
		  <Text style={{color: '#F06292'}}>Total tests</Text>
		  <Text style={{color: 'white'}}>{FormatNumber(data.tests)}</Text>
		</View>
		<TouchableNativeFeedback onPress={() => props.navigation.navigate('CountryData')}>
		  <View style={styles.bottomCard}>
		    <Text  style={{color: 'white'}}>Country Data</Text>
		  </View>
		  
		</TouchableNativeFeedback>
	  </View>
    </ScrollView>
  );
};

WorldScreen.navigationOptions = {
    headerTitle: 'Covid-19 Status (World)',
	headerStyle: {
		backgroundColor: 'black'
	},
	headerTintColor: 'white'
};

const styles = StyleSheet.create({
  container: {
	padding: 10,
	backgroundColor: 'black',
  },
  indicator: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: 'black'
  },
  chartSection: {
	flexDirection: 'row',
	justifyContent: 'space-around',
	backgroundColor: '#263238',
	borderRadius: 10,
	padding: 10,
	alignItems: 'center',
	height: (screenHeight/100)*25
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
	height: (screenHeight/100)*10
  }
});

export default WorldScreen;
