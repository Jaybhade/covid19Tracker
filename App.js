import React from 'react';
import {View, StatusBar, Alert, DevSettings} from 'react-native';
import NetInfo from "@react-native-community/netinfo";
//local
import CovidNavigator from './navigation/CovidNavigator';

const App = () => {
  const [connection, setConnection] = React.useState(true)	
  
  React.useEffect(() => {
    NetInfo.fetch().then(state => {
      setConnection(state.isConnected);
    });
  }, [connection])
  
  if(connection) {
	return (
      <>
	    <StatusBar hidden={true} />
        <CovidNavigator />
	  </>
    );
  } else {
	return (
	  <View style={{backgroundColor: 'black', flex: 1}}>
	    { 
			Alert.alert(
			  'No Internet Connection',
			  'There is a problem in your internet connection',
			  [
				{ text: 'Reload', onPress: () => DevSettings.reload() }
			  ],
			  { cancelable: false }
			)
		}
	  </View>
	)
  }
};

export default App;
