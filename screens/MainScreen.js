import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import RecentGame from "../components/games/RecentGame";
import RecentTeams from "../components/teams/RecentTeams";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import PublicGamesScreen from "./games/PublicGamesScreen";
import { SetToken } from "../context/SetToken";





const MainScreen = props => {
  const { token, username } = useContext(SetToken);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>שלום {username}</Text>
      <RecentGame navigation={props.navigation} />
      <Button title="פתח משחק" onPress={() => props.navigation.navigate("CreateNewGame")}/>
      <RecentTeams navigation={props.navigation} />
      <Button title="רוצה לשחק היום" onPress={() => props.navigation.navigate("PublicGamesScreen")}/>
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
    </HeaderButtons>,
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