import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView } from "react-native";
import { AppStyles, InputStyle, DropdownStyle, PageStyle } from "../../components/styles/AppStyles";
import Button from "react-native-button";
import API from "../../ApiService";
import SelectDropdown from 'react-native-select-dropdown';




const RegisterScreen = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('');
  const [city, setCity] = useState('');
  const yourSex = ['זכר', 'נקבה'];
  const finishRegistration = () => {
    if (username && password && email && phoneNumber && age && city && sex && phoneNumber) {
      let formdata = new FormData();
      formdata.append("username", username);
      formdata.append("password", password);
      formdata.append("email", email);
      formdata.append("phone_number", phoneNumber);
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
    } else {
      alert("נא לוודא שכל השדות מולאו");
    }

  };


  return (
    <ScrollView>
      <View style={PageStyle.container}>
        <Text style={PageStyle.title}>יצירת משתמש חדש</Text>
        <View style={InputStyle.inputContainerView}>
          <TextInput
            style={InputStyle.bodyInput}
            placeholder="שם משתמש"
            onChangeText={setUsername}
            value={username}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          /></View>
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
            style={InputStyle.bodyInput}
            placeholder="אימייל"
            onChangeText={setEmail}
            value={email}
            keyboardType="email-address"
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          /></View>
        <View style={InputStyle.inputContainerView}>
          <TextInput
            style={InputStyle.bodyInput}
            placeholder="גיל"
            onChangeText={setAge}
            value={age}
            keyboardType="numeric"
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          /></View>
        <View style={InputStyle.inputContainerView}>
          <TextInput
            style={InputStyle.bodyInput}
            placeholder="עיר מגורים"
            onChangeText={setCity}
            value={city}
            placeholderTextColor={AppStyles.color.grey}
            underlineColorAndroid="transparent"
          /></View>
        <View style={InputStyle.inputContainerView}>
          <TextInput
            style={InputStyle.bodyInput}
            placeholder="מספר טלפון"
            onChangeText={setPhoneNumber}
            value={phoneNumber}
            keyboardType="numeric"
            placeholderTextColor={AppStyles.color.grey}

            underlineColorAndroid="transparent"
          /></View>
        <View style={InputStyle.inputContainerView}>
          <SelectDropdown
            buttonStyle={DropdownStyle.dropdownButton}
            buttonTextStyle={DropdownStyle.dropdownTextButton}
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
          containerStyle={[PageStyle.buttonStyle, { marginTop: 50 }]}
          style={PageStyle.buttonTextStyle}>
          סיום
        </Button>
      </View>
    </ScrollView>
  );
};
RegisterScreen.navigationOptions = () => {
  return {
    headerTitle: "הרשמה"
  }
};
export default RegisterScreen;