 
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
 
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './Screens/login'

import HomeScreen from './Screens/home'

import AddDeviceScreen from './Screens/deviceAdd'
import * as Notifications from 'expo-notifications';

const Stack = createStackNavigator();
 
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export default class App extends React.Component {



  constructor(props) {
  
    super(props);
     
  }
  
  render() {
    return (

      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddDevice" component={AddDeviceScreen} />
      </Stack.Navigator>
      </NavigationContainer>
     
    );
  }
}

 
 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
