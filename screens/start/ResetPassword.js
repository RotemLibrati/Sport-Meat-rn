import { StyleSheet, Text, View, ScrollView, TextInput } from 'react-native';
import React, { useState } from 'react';
import { PageStyle, InputStyle, AppStyles } from '../../components/styles/AppStyles';
import Button from "react-native-button";
import API from '../../ApiService';

const ResetPassword = props => {
  const email = props.navigation.getParam('email');
  const [password, setPassword] = useState('');
  const [passwordAuth, setPasswordAuth] = useState('');
  const [match, setMatch] = useState(true);
  const checkPasswordHandler = () => {
    if (password === passwordAuth) {
      const changePassword = () => {
        let formdata = new FormData();
        formdata.append("password", password);
        let requestOptions = {
          method: 'PUT',
          body: formdata,
        };
        fetch(`${API.ipAddress}/change-password/${email}/`,
          requestOptions)
          .then(function () {
            alert("הסיסמה שונתה בהצלחה");
            setTimeout(() => {
              props.navigation.navigate("LoginScreen");
            },1000);
          })
          .catch((error) => alert("לא היה ניתן לשנות את הסיסמה \n נסה שוב"));
      };
      changePassword();
    } else {
      setMatch(false);
    }
  }
  return (
    <ScrollView>
      <View style={PageStyle.container}>
        <Text style={PageStyle.title}>הזן סיסמה חדשה</Text>
        <View style={InputStyle.inputContainerView}>
          <TextInput
            secureTextEntry={true}
            style={InputStyle.bodyInput}
            placeholder="סיסמה"
            onChangeText={setPassword}
            value={password}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          /></View>
        <View style={InputStyle.inputContainerView}>
          <TextInput
            secureTextEntry={true}
            style={InputStyle.bodyInput}
            placeholder="אימות סיסמה"
            onChangeText={setPasswordAuth}
            value={passwordAuth}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          /></View>
        {!match && <Text style={{ marginTop: 10 }}>סיסמאות לא תואמות</Text>}
        <Button
          title="סיום"
          onPress={checkPasswordHandler}
          containerStyle={[PageStyle.buttonStyle, { marginTop: 50 }]}
          style={PageStyle.buttonTextStyle}>
          סיום
        </Button>

      </View>
    </ScrollView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});