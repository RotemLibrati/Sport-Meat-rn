import React from "react";
import Button from "react-native-button";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { AppStyles } from "../../components/styles/AppStyles";


const TEAM_ITEM_HEIGHT = 180;
const TEAM_ITEM_MARGIN = 10;
const teamNumColums = 2;
const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
const StartScreen = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sport Meet</Text>
      <Image style={styles.photo} source={require('../../assets/pictures/SportsMeet.jpg')}/>
      <Button
        containerStyle={styles.loginContainer}
        style={styles.loginText}
        onPress={() => props.navigation.navigate("LoginScreen")}>
          התחברות
      </Button>
      <Button
        containerStyle={styles.signupContainer}
        style={styles.signupText}
        onPress={() => props.navigation.navigate("RegisterScreen")}>
          הרשמה
      </Button>
    </View>
  );
};
StartScreen.navigationOptions = () => {
  return {
    headerTitle: "דף כניסה"
  }
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 150,
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
  loginContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  loginText: {
    color: AppStyles.color.white,
  },
  signupContainer: {
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.white,
    borderRadius: AppStyles.borderRadius.main,
    padding: 8,
    borderWidth: 1,
    borderColor: AppStyles.color.tint,
    marginTop: 15,
  },
  signupText: {
    color: AppStyles.color.tint,
  },
  photo: {
    width: (SCREEN_WIDTH - (teamNumColums + 1) * TEAM_ITEM_MARGIN) / teamNumColums,
    height: TEAM_ITEM_HEIGHT,
    borderRadius: 15,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0
},
});
export default StartScreen;