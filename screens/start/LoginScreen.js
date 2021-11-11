import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, Button, ScrollView } from "react-native";
import API from "../../ApiService";
import { SetToken } from "../../context/SetToken";

const LoginScreen = props => {
    const { addToken, addUsername, loginHandler } = useContext(SetToken);
    const [tryLoggedin, setTryLoggedin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const loginUser = () => {
        let formdata = new FormData();
        formdata.append("username", username);
        formdata.append("password", password);
        formdata.append("grant_type", "password");
        formdata.append("client_id", API.clientID);
        fetch(`${API.ipAddress}/o/token/`, {
            method: "POST",
            body: formdata
        })
            .then(resp => resp.json())
            .then(function(resp){ 
                setAccessToken(resp.access_token)
                if (accessToken) {
                    addToken(accessToken);
                    addUsername(username);
                    loginHandler(true);
                    props.navigation.navigate("MainScreen");
                } else
                    setTryLoggedin(true);
            })
            //.then(resp => console.log(resp))
            .catch(error => console.log(error))
        }
    
    return (
        <ScrollView keyboardShouldPersistTaps='always'>
            {/* <View style={styles.container}> */}
                <Text>התחברות</Text>
                {/* {tryLoggedin ? <Text>שם המשתמש או הסיסמה אינם נכונים</Text> : */}
                    <Text>אנא הכנס שם משתמש וסיסמה</Text>

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
            {/* </View> */}
        </ScrollView>
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