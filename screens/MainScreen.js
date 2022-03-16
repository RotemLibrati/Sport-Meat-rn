import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import RecentGame from "../components/games/RecentGame";
import RecentTeams from "../components/teams/RecentTeams";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from "../components/HeaderButton";
import { SetToken } from "../context/SetToken";
import { PageStyle, AppStyles } from "../components/styles/AppStyles";
import Button from "react-native-button";





const MainScreen = props => {
  const { token, username } = useContext(SetToken);
  return (
    <ScrollView>
      <View style={PageStyle.container}>
        <Text style={styles.title}>שלום {username}</Text>
        <RecentGame navigation={props.navigation} />
          <Button
            onPress={() => props.navigation.navigate("CreateNewGame")}
            containerStyle={PageStyle.buttonStyle}
            style={PageStyle.buttonTextStyle}>
            פתח משחק
          </Button>
        {/* <Button title="פתח משחק" onPress={() => props.navigation.navigate("CreateNewGame")} /> */}
        <RecentTeams navigation={props.navigation} />
        {/* <Button title="רוצה לשחק היום!" onPress={() => props.navigation.navigate("PublicGamesScreen")} /> */}
          <Button
            onPress={() => props.navigation.navigate("PublicGamesScreen")}
            containerStyle={PageStyle.buttonStyle}
            style={PageStyle.buttonTextStyle}>
            רוצה לשחק היום !
          </Button>
      </View>
    </ScrollView>
  );
};
MainScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "ראשי",
    headerLeft: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
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
    fontSize: AppStyles.fontSize.title,
    fontWeight: 'bold',
    color: AppStyles.color.tint,
    marginTop: 20,
    textAlign: 'center',
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
  },
});

export default MainScreen;