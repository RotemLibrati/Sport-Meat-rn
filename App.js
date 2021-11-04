import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SportMeetNavigator from './navigation/SportMeetNavigator';
import MainScreen from './screens/MainScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



export default function App() {
  return (
    // <NavigationContainer>
    //   <Tab.Navigator>
        <SportMeetNavigator />
      /* </Tab.Navigator>
    </NavigationContainer> */
    // <MainScreen />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
