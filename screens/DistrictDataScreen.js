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

const DistrictDataScreen = (props) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState({});

  const loader = React.useCallback(async () => {
	const url = await 'https://api.covid19india.org/v2/state_district_wise.json';
	const response_2 = await fetch(url);
	const dat_2 = await response_2.json();
    const some = dat_2.filter(st => st.state === props.navigation.getParam('state'));
    const somee = some.map(st => st.districtData);
	setData(somee[0]);
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
		  <Text style={{...styles.stateHeading, color: '#FF6F00'}} numberOfLines={1}>Districts</Text>
		  <Text style={styles.stateCases}>Total Cases</Text>
		</View>
		<FlatList 
		  data={data}
		  renderItem={(item) => {
			return (
			<TouchableNativeFeedback onPress={() => {
				props.navigation.navigate({
					  routeName: 'District',
					  params: {
						districtName: item.item.district,
						confirmed: item.item.confirmed,
						dconfirmed: item.item.delta.confirmed,
						active: item.item.active,
						recovered: item.item.recovered,
						drecovered: item.item.delta.recovered,
						decreased: item.item.deceased,
						ddecreased: item.item.delta.deceased,
					  }
				  })
			}} >
			  <View style={styles.heading}>
		        <Text style={styles.stateHeading} numberOfLines={1}>{item.item.district}</Text>
		        <Text style={styles.stateCases}>{FormatNumber(item.item.confirmed)}</Text>
		      </View>
			</TouchableNativeFeedback>
			)
		  }}
		  keyExtractor={item => item.district}
		/>
	</View>
  )
};

DistrictDataScreen.navigationOptions = navigationData => {
    const title = navigationData.navigation.getParam('state');
	
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
	flex: 1,
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
  indicator: {
	  flex: 1,
	  justifyContent: 'center',
	  alignItems: 'center',
	  backgroundColor: 'black'
  },
  heading: {
	flexDirection: 'row',
	margin: 5,
	backgroundColor: '#263238',
	borderRadius: 3,
	padding: 4
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

export default DistrictDataScreen;