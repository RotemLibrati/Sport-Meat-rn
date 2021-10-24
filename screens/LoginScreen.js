import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import RegisterScreen from "./RegisterScreen";
import { NavigationActions } from "react-navigation";

const LoginScreen = props => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const loginUser = () => {
        let formdata = new FormData();
        console.log(typeof (username));
        formdata.append("username", username);
        formdata.append("password", password);
        fetch('http://192.168.1.19:8008/login', {
            method: "POST",
            body: formdata
        })
            .then(resp => resp.json())
            .then(resp => console.log(resp))
            .catch(error => console.log(error));
        // API.loginUser({"username":username, "password": password});
    };
    return (
        <View style={styles.container}>
            <Text>התחברות</Text>
            <TextInput
                style={styles.input}
                placeholder="שם משתמש"
                onChangeText={setUsername}
                value={username}
            />
            <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder="סיסמה"
                onChangeText={setPassword}
                value={password}
            />
            <Button title="התחבר"
                onPress={loginUser} />
        </View>
    );
};
// () => props.navigation.navigate("RegisterScreen")

LoginScreen.navigationOptions = () => {
    return {
        headerTitle: "התחברות"
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: '50%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
});
export default LoginScreen;