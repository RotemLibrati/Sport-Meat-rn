import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import RecentGame from "../components/games/RecentGame";
import RecentTeams from "../components/teams/RecentTeams";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";

const MainScreen = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>שלום</Text>
      <RecentGame navigation={props.navigation} />
      <RecentTeams navigation={props.navigation} />
    </View>
  );
};
MainScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "ראשי",
    headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName="menu"
        onPress={() => { navData.navigation.toggleDrawer() }} />
    </HeaderButtons>
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
    fontSize: 24
  }
});

export default MainScreen;