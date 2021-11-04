import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const StartScreen = props => {
    return(
        <View style={styles.container}>
            <Text>Sport Meet</Text>
            <Button 
              title="התחברות"
              onPress={() => props.navigation.navigate("LoginScreen")}
            />
            <Button 
              title="הרשמה"
              onPress={() => props.navigation.navigate("RegisterScreen")}
            />
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
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
export default StartScreen;