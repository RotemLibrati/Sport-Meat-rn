import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SportMeetNavigator from './navigation/SportMeetNavigator';
import MainScreen from './screens/MainScreen';



export default function App() {
  return (
    <SportMeetNavigator />
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
