import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import RecentGame from "../components/games/RecentGame";
import Teams from "../components/teams/Teams";

const MainScreen = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>שלום</Text>
      <RecentGame navigation={props.navigation}/>
      <Teams navigation={props.navigation}/>
    </View>
  );
};
MainScreen.navigationOptions = () => {
  return {
      headerTitle: "ראשי"
  }
};
const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  title: {
    fontSize:24
  }
});

export default MainScreen;