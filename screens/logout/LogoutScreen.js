import React, { useContext } from "react";
import { View, Text, StyleSheet, Alert } from 'react-native';
import { PageStyle } from "../../components/styles/AppStyles";
import { SetToken } from "../../context/SetToken";
import { Button } from "react-native-elements";
import API from '../../ApiService';

const LogoutScreen = props => {
    const { username, loginHandler } = useContext(SetToken);
    const logoutHandler = async () => {
        await fetch(`${API.ipAddress}/logout`, {
            method: "POST",
        })
            .then(function () {
                loginHandler(false);
            })
            .catch(error => console.log(error))
    };
    const preferLogin = () => {
        props.navigation.goBack();
    }
    return <View style={PageStyle.container}>
        <Text style={PageStyle.title}>שלום {username}</Text>
        <Text style={PageStyle.TextStyle}> האם אתה בטוח שברצונך להתנתק ? </Text>
        <View style={styles.buttonContaiber}>
            <Button
                title="רוצה להשאר"
                buttonStyle={{ backgroundColor: 'green' }}
                containerStyle={{
                    height: 40,
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                titleStyle={{
                    color: 'white',
                    marginHorizontal: 20,
                }}
                onPress={() => preferLogin()}
            />
            <Button
                title="מעדיף לצאת"
                buttonStyle={{ backgroundColor: 'red' }}
                containerStyle={{
                    height: 40,
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                }}
                titleStyle={{ color: 'white', marginHorizontal: 20 }}
                onPress={() => logoutHandler()}
            />
        </View>
    </View>
};

const styles = StyleSheet.create({
    buttonContaiber: {
        marginTop: 15
    }
});

LogoutScreen.navigationOptions = () => {
    return {
        headerTitle: "דף התנתקות"
    }
};



export default LogoutScreen;