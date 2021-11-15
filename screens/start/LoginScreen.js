import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import API from "../../ApiService";
import { SetToken } from "../../context/SetToken";
import Button from "react-native-button";
import { AppStyles } from "../../components/styles/AppStyles";

const LoginScreen = props => {
    const { addToken, addUsername, loginHandler } = useContext(SetToken);
    const [tryLoggedin, setTryLoggedin] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const login = (token) => {
        addToken(token)
        addUsername(username);
        loginHandler(true);
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
    }

    return (
        // <ScrollView keyboardShouldPersistTaps='always'>
        <View style={styles.container}>
            <Text style={[styles.title, styles.leftTitle]}>התחברות</Text>
            <View style={styles.InputContainer}>
                {/* {tryLoggedin ? <Text>שם המשתמש או הסיסמה אינם נכונים</Text> :
                (<Text>אנא הכנס שם משתמש וסיסמה</Text>)} */}

                <TextInput
                    style={styles.body}
                    placeholderTextColor={AppStyles.color.grey}
                    placeholder="שם משתמש"
                    onChangeText={setUsername}
                    value={username}
                    underlineColorAndroid="transparent"
                />
            </View>
            <View style={styles.InputContainer}>
                <TextInput
                    secureTextEntry={true}
                    style={styles.body}
                    placeholder="סיסמה"
                    onChangeText={setPassword}
                    value={password}
                    placeholderTextColor={AppStyles.color.grey}
                    underlineColorAndroid="transparent"
                />
            </View>
            <Button
                containerStyle={styles.loginContainer}
                style={styles.loginText}
                onPress={loginUser} >
                התחבר
            </Button>
            <Text style={styles.or}>או</Text>
            <Button
                containerStyle={styles.facebookContainer}
                style={styles.facebookText}>
                {/* // onPress={() => onPressFacebook()} */}
                התחבר עם פייסבוק
            </Button>
        </View>
        // </ScrollView>
    );
};
LoginScreen.navigationOptions = () => {
    return {
        headerTitle: "התחברות"
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    or: {
        color: 'black',
        marginTop: 40,
        marginBottom: 10,
    },
    title: {
        fontSize: AppStyles.fontSize.title,
        fontWeight: 'bold',
        color: AppStyles.color.tint,
        marginTop: 20,
        marginBottom: 20,
    },
    leftTitle: {
        alignSelf: 'stretch',
        textAlign: 'center',
        marginLeft: 20,
    },
    content: {
        paddingLeft: 50,
        paddingRight: 50,
        textAlign: 'center',
        fontSize: AppStyles.fontSize.content,
        color: AppStyles.color.text,
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
    placeholder: {
        color: 'red',
    },
    InputContainer: {
        width: AppStyles.textInputWidth.main,
        marginTop: 30,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: AppStyles.color.grey,
        borderRadius: AppStyles.borderRadius.main,
    },
    body: {
        height: 42,
        paddingLeft: 20,
        paddingRight: 20,
        color: AppStyles.color.text,
    },
    facebookContainer: {
        width: 192,
        backgroundColor: AppStyles.color.facebook,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
    },
    facebookText: {
        color: AppStyles.color.white,
    },
    googleContainer: {
        width: 192,
        height: 48,
        marginTop: 30,
    },
    googleText: {
        color: AppStyles.color.white,
    },
});
export default LoginScreen;