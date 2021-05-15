import React from 'react';
import { 
	View, 
	Text, 
	TextInput, 
	StyleSheet, 
	FlatList,
	ActivityIndicator,
	RefreshControl,
	TouchableNativeFeedback
} from 'react-native';

import FormatNumber from '../components/NumFormat';

const StateDataScreen = (props) => {
  const [value, setValue] = React.useState('')
  const [data, setData] = React.useState({});
  const [stateName, setStateName] = React.useState({});
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  
  const loader = React.useCallback(async () => {
	setIsRefreshing(true);
      const url_1 = await 'https://api.covid19india.org/data.json';
      const response = await fetch(url_1);
      const dat = await response.json();
	  //state
	  const states = dat.statewise.filter(item => item.state != 'Total');
	  setStateName(states);
	setIsRefreshing(false);
  }, []);
  
  React.useEffect(() => {
    setIsLoading(true);
    loader().then(() => {
      setIsLoading(false);
    });
  }, [loader]);

  
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
		  onChangeText={handleChange}
		  placeholder='Search'
		  placeholderTextColor='white'
		/>*/}
		<View style={styles.heading}>
		  <Text style={{...styles.stateHeading, color: '#FF6F00'}} numberOfLines={1}>State</Text>
		  <Text style={styles.stateCases}>Total Cases</Text>
		</View>
		<FlatList
		  data={stateName}
		  renderItem={({item}) => 
		      <TouchableNativeFeedback onPress={()=>{
				  props.navigation.navigate({
					  routeName: 'State',
					  params: {
						stateName: item.state,
						confirmed: item.confirmed,
						dconfirmed: item.deltaconfirmed,
						active: item.active,
						recovered: item.recovered,
						drecovered: item.deltarecovered,
						decreased: item.deaths,
						ddecreased: item.deltadeaths,
						lastUpdate: item.lastupdatedtime
					  }
				  })
			  }}>
				<View style={styles.heading}>
				  <Text style={styles.stateHeading} numberOfLines={1}>{item.state}</Text>
				  <Text style={styles.stateCases}>{FormatNumber(item.confirmed)}</Text>
				</View>
			  </TouchableNativeFeedback>
					}
		  keyExtractor={item => item.state}
		  refreshControl={
			<RefreshControl refreshing={isRefreshing} onRefresh={loader} />
		  }
		/>
	</View>
  )
};

StateDataScreen.navigationOptions = {
    headerTitle: 'State Data',
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
  input: {
	color: 'white',
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
	padding: 6
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
  indicator: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: 'black'
  },
});

export default StateDataScreen;