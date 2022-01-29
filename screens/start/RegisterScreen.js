import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { AppStyles } from "../../components/styles/AppStyles";
import Button from "react-native-button";
import API from "../../ApiService";
import SelectDropdown from 'react-native-select-dropdown';




const RegisterScreen = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('');
  const [city, setCity] = useState('');
  const yourSex = ['זכר', 'נקבה'];
  const finishRegistration = () => {
    let formdata = new FormData();
    formdata.append("username", username);
    formdata.append("password", password);
    formdata.append("email", email);
    //formdata.append("verifyPassword", verifyPassword);
    formdata.append("age", age);
    formdata.append("city", city);
    formdata.append("sex", sex);
    fetch(`${API.ipAddress}/register`, {
      method: "POST",
      body: formdata
    })
      .then(resp => resp.json())
      .then(resp => console.log(resp))
      .catch(error => console.log(error));
    props.navigation.goBack();
  };


  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={[styles.title, styles.leftTitle]}>יצירת משתמש חדש</Text>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="שם משתמש"
            onChangeText={setUsername}
            value={username}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          /></View>
        <View style={styles.InputContainer}>
          <TextInput
            secureTextEntry={true}
            style={styles.body}
            placeholder="סיסמה"
            onChangeText={setPassword}
            value={password}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          /></View>
        <View style={styles.InputContainer}>
          <TextInput
            secureTextEntry={true}
            style={styles.body}
            placeholder="סיסמה פעם נוספת"
            onChangeText={setVerifyPassword}
            value={verifyPassword}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          /></View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="אימייל"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          /></View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="גיל"
            onChangeText={setAge}
            value={age}
            keyboardType="numeric"
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          /></View>
        <View style={styles.InputContainer}>
          <TextInput
            style={styles.body}
            placeholder="עיר מגורים"
            onChangeText={setCity}
            value={city}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          /></View>
        <View style={styles.InputContainer}>
          <SelectDropdown
            buttonStyle={styles.body, styles.dropdownButton}
            buttonTextStyle={styles.dropdownTextButton}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
            defaultButtonText="מין"
            onSelect={(index) => {
              setSex(index)
            }}
            data={yourSex}
            buttonTextAfterSelection={(selectedItem, index) => {
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              return item
            }}
          /></View>
        <Button
          title="סיום"
          onPress={finishRegistration}
          containerStyle={[styles.facebookContainer, { marginTop: 50 }]}
          style={styles.facebookText}>
          סיום
        </Button>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
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
    width: AppStyles.buttonWidth.main,
    backgroundColor: AppStyles.color.tint,
    borderRadius: AppStyles.borderRadius.main,
    padding: 10,
    marginTop: 30,
  },
  facebookText: {
    color: AppStyles.color.white,
  },
  dropdownButton: {
    backgroundColor: 'transparent',
    height: 42
  },
  dropdownTextButton: {
    fontSize: 15,
    color: AppStyles.color.grey,
    textAlign: 'left'
  }

});

RegisterScreen.navigationOptions = () => {
  return {
    headerTitle: "הרשמה"
  }
};
export default RegisterScreen;