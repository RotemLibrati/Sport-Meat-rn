import { StatusBar } from 'expo-status-bar';
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
// import SportMeetNavigator from './navigation/SportMeetNavigator';
// import EnterNavigator from './navigation/EnterNavigator';
import SetTokenProvider from './context/SetToken';
// import { SetToken } from './context/SetToken';
import SportMeet from './components/SportMeet';


const App = () => {
  return (
    <SetTokenProvider>
      <SportMeet />
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