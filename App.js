import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SportMeetNavigator from './navigation/SportMeetNavigator';
import SetTokenProvider from './context/SetToken';

const App = () => {
  return (
    <SetTokenProvider>
      <SportMeetNavigator />
    </SetTokenProvider>

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
export default App;