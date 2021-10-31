import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Button } from "react-native";
import ModalDropdown from "react-native-modal-dropdown";
import API from "../../ApiService";



const RegisterScreen = props => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [sex, setSex] = useState('');
  const [city, setCity] = useState('');

  let data = [
    { value: 'Male' },
    { value: 'Female' }
  ];

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
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text>הרשמה לאפליקציה</Text>
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
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          placeholder="סיסמה פעם נוספת"
          onChangeText={setVerifyPassword}
          value={verifyPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="אימייל"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <ModalDropdown
          style={styles.input}
          isFullWidth={true}
          dropdownTextStyle={{ fontSize: 15 }}
          defaultValue='מין'
          options={['זכר', 'נקבה']}
          placeholder="מין"
          onSelect={sex => sex == 0 ? setSex("זכר") : setSex("נקבה")}
        />
        <TextInput
          style={styles.input}
          placeholder="גיל"
          onChangeText={setAge}
          value={age}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="עיר מגורים"
          onChangeText={setCity}
          value={city}
        />
      </View>
      <Button
        title="סיום"
        onPress={finishRegistration}
      />
    </ScrollView>
  );
};
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
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dropdown: {
    position: 'absolute',
    height: (33 + StyleSheet.hairlineWidth) * 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'lightgray',
    borderRadius: 2,
    backgroundColor: 'white',
    justifyContent: 'center'
  },
});

RegisterScreen.navigationOptions = () => {
  return {
    headerTitle: "הרשמה"
  }
};
export default RegisterScreen;