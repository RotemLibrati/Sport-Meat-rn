import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import API from "../../ApiService";
import { SetToken } from "../../context/SetToken";
import Button from "react-native-button";
import { AppStyles, PageStyle, InputStyle } from "../../components/styles/AppStyles";

const LoginScreen = props => {
    const { addToken, addUsername, loginHandler } = useContext(SetToken);
    const [tryLoggedin, setTryLoggedin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = (token) => {
        addToken(token)
        addUsername(username);
        loginHandler(true);
        setTryLoggedin(false);
    };
    const notLogin = () => {
        loginHandler(false);
        setTryLoggedin(true);
    }
    const loginUser = async () => {
        let formdata = new FormData();
        formdata.append("username", username);
        formdata.append("password", password);
        formdata.append("grant_type", "password");
        formdata.append("client_id", API.clientID);
        await fetch(`${API.ipAddress}/o/token/`, {
            method: "POST",
            body: formdata
        })
            .then(resp => resp.json())
            .then(function (resp) {
                resp.access_token ? login(resp.access_token) : notLogin()
            })
            .catch(error => console.log(error))
    };
    const forgotPasswordHandler = () => {
        props.navigation.navigate("ForgotPasswordScreen");
    }

    return (
        <ScrollView>
            <View style={PageStyle.container}>
                <Text style={PageStyle.title}>התחברות</Text>
                {tryLoggedin ? <Text>שם המשתמש או הסיסמה אינם נכונים</Text> :
                    (<Text></Text>)}
                <View style={InputStyle.inputContainerView}>


                    <TextInput
                        style={InputStyle.bodyInput}
                        placeholderTextColor={AppStyles.color.grey}
                        placeholder="שם משתמש"
                        onChangeText={setUsername}
                        value={username}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={InputStyle.inputContainerView}>
                    <TextInput
                        secureTextEntry={true}
                        style={InputStyle.bodyInput}
                        placeholder="סיסמה"
                        onChangeText={setPassword}
                        value={password}
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <Button
                    containerStyle={PageStyle.buttonStyle}
                    style={PageStyle.buttonTextStyle}
                    onPress={loginUser} >
                    התחבר
                </Button>
                <Button
                    style={styles.forgotPasswordButton}
                    onPress={forgotPasswordHandler}
                    >
                    שכחת סיסמה ?
                </Button>
            </View>
        </ScrollView>
    );
};
LoginScreen.navigationOptions = () => {
    return {
        headerTitle: "התחברות"
    }
}

const styles = StyleSheet.create({
    forgotPasswordButton: {
        marginTop: 15
    }
});
export default LoginScreen;