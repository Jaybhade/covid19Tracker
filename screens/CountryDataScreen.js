import React from 'react';
import { 
	View, 
	Text, 
	TextInput, 
	StyleSheet, 
	FlatList,
	TouchableNativeFeedback,
	ActivityIndicator
} from 'react-native';

import FormatNumber from '../components/NumFormat';

const CountryDataScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState({});

  const loader = React.useCallback(async () => {
	const url = await 'https://corona.lmao.ninja/v2/countries?yesterday&sort';
	const response_2 = await fetch(url);
	const dat_2 = await response_2.json();
	setData(dat_2);
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
  
  return (
    <View style={styles.container}>
		{/*<TextInput
		  style={styles.input}
		  value={value}
		  onChangeText={text=>setValue(text)}
		  placeholder='Search'
		  placeholderTextColor='white'
		/>*/}
		<View style={styles.heading}>
		  <Text style={{...styles.stateHeading, color: '#FF6F00'}} numberOfLines={1}>Countries</Text>
		  <Text style={styles.stateCases}>Total Cases</Text>
		</View>
		<FlatList 
		  data={data}
		  renderItem={(item) => {
			return (
			<TouchableNativeFeedback onPress={() => {
				props.navigation.navigate({
					  routeName: 'Country',
					  params: {
						countryName: item.item.country,
						confirmed: item.item.cases,
						dconfirmed: item.item.todayCases,
						active: item.item.active,
						recovered: item.item.recovered,
						drecovered: item.item.todayRecovered,
						decreased: item.item.deaths,
						ddecreased: item.item.todayDeaths,
						tests: item.item.tests,
					  }
				  })
			}} >
			  <View style={styles.heading}>
		        <Text style={styles.stateHeading} numberOfLines={1}>{item.item.country}</Text>
		        <Text style={styles.stateCases}>{FormatNumber(item.item.cases)}</Text>
		      </View>
			</TouchableNativeFeedback>
			)
		  }}
		  keyExtractor={item => item.country}
		/>
	</View>
  )
};

CountryDataScreen.navigationOptions = {
    headerTitle: 'World Data',
	headerStyle: {
		backgroundColor: 'black'
	},
	headerTintColor: 'white'
};

const styles = StyleSheet.create({
  container: {
	flex: 1,
	backgroundColor: 'black'
  },
  indicator: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: 'black'
  },
  input: {
	height: 40,
	borderColor: 'white',
	borderWidth: 1,
	borderRadius: 10,
	backgroundColor: '#263238',
	paddingLeft:25 ,
	margin: 10
  },
  heading: {
	flexDirection: 'row',
	margin: 5,
	backgroundColor: '#263238',
	borderRadius: 3,
	padding: 8
  },
  stateHeading: {
	color: 'white',
	width: '65%',
	marginLeft: 4
  },
  stateCases: {
	color: '#FBC02D',
	width: '35%'
  },
});

export default CountryDataScreen;