import React from 'react';
import {
  View, 
  Text, 
  ScrollView, 
  StyleSheet,
  RefreshControl,
  TouchableNativeFeedback,
  ActivityIndicator,
  Dimensions,
  Button,
  ToastAndroid
} from 'react-native';


//local
import PieChart from '../components/PieChart';
import Card from '../components/Card';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const IndianScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [data, setData] = React.useState({});
  const [indiaTest, setIndiaTest] = React.useState();
  const [isVisible, setIsVisible] = React.useState(false);

 const loader = React.useCallback(async () => {
	setIsRefreshing(true);
	setIsVisible(true);
    var requestOptions = {
		method: 'GET',
		redirect: 'follow'
	};

	await fetch("https://api.covid19india.org/data.json", requestOptions)
		.then(response => response.json())
		.then(result => setData(result['statewise'][0]))
		.catch(error => console.log('error', error));

	await fetch("https://corona.lmao.ninja/v2/countries/India?yesterday&strict&query ", requestOptions)
	  .then(response => response.json())
	  .then(result => setIndiaTest(result.tests.toString()))
	  .catch(error => console.log('error', error));
	  setIsVisible(false);
	  setIsRefreshing(false);
 }, []);
 
  const Comp = () => {
	  return (
		<PieChart
		  active={data.active}
		  recovered={data.recovered}
		  decreased={data.deaths}
		/>
	  )
  }
  
  React.useEffect(() => {
    setIsLoading(true);
    loader().then(() => {
      setIsLoading(false);
    });
  }, [loader]);
  
  
  const Toast = ({ visible, message }) => {
	  if (visible) {
		ToastAndroid.showWithGravityAndOffset(
		  message,
		  ToastAndroid.SHORT,
		  ToastAndroid.BOTTOM,
		  25,
		  50
		);
		return null;
	  }
	return null;
  };
  
  if(isLoading){
	  return(
	    <View style={styles.indicator}>
		  <ActivityIndicator size="large" color="white" />
		</View>
	  )
  } else {
    return (
		<ScrollView style={styles.container} 
			refreshControl={
				<RefreshControl refreshing={isRefreshing} onRefresh={loader} />
			}>
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
			<Card pad={45} tag='Confirmed' color='#FBC02D' stats={data.confirmed} change={data.deltaconfirmed} sign='+'/>
			<Card pad={45} tag='Active' color='#80DEEA' stats={data.active} />
		  </View>
		  <View style={styles.card}>
			<Card pad={45} tag='Recovered' color='#8BC34A' stats={data.recovered} change={data.deltarecovered} sign='+'/>
			<Card pad={45} tag='Decreased' color='#FF5252' stats={data.deaths} change={data.deltadeaths} sign='+'/>
		  </View>
		  <View style={styles.card}>
			<Card pad={45} pad={45} tag='Samples Tested' color='#F06292' stats={indiaTest} />
			<Card pad={45} tag='Last Update' color='white' stats='jay' change={data.lastupdatedtime} />
		  </View>
		  <View style={styles.bottomCardSection}>
			<TouchableNativeFeedback onPress={() => props.navigation.navigate('StateData')}>  
			  <View style={styles.bottomCard}>
			   <Text style={{color: 'white'}}>State Data</Text>
			  </View>
			</TouchableNativeFeedback>
			<TouchableNativeFeedback onPress={() => props.navigation.navigate('World')}>
			  <View style={styles.bottomCard}>
				<Text  style={{color: 'white'}}>World Data</Text>
			  </View>
			</TouchableNativeFeedback>
			<Toast visible={isVisible} message="Data Refreshed" />
		  </View>
		</ScrollView>
	  );
	};
  }

IndianScreen.navigationOptions = navigationData => {
    return {
		headerTitle: 'Covid-19 Status (India)',
		headerStyle: {
			backgroundColor: 'black'
		},
		headerTintColor: 'white',
	}
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
	height: (screenHeight/100)*22
  },
  card: {
	flexDirection: 'row',
	justifyContent: 'space-between'
  },
  bottomCardSection: {
	flexDirection: 'row',
	justifyContent: 'space-around'
  },
  bottomCard: {
	margin: 10,
	width: '48%',
    backgroundColor: '#263238',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 10,
	padding: 20,
	height: (screenHeight/100)*5
  },
});

export default IndianScreen;
