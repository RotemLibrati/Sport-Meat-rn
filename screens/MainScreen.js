import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const MainScreen = props =>{
    return (
        <View style={styles.container}>
            <Text>Main Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  
export default MainScreen;