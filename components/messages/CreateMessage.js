import React, { useContext, useState } from "react";
import { Text, View, TextInput, ScrollView, StyleSheet } from 'react-native';
import { PageStyle, InputStyle, AppStyles } from "../styles/AppStyles";
import Button from "react-native-button";
import { SetToken } from "../../context/SetToken";
import API from '../../ApiService';
const CreateMessage = (props) => {
    const teamId = props.navigation.getParam("teamId", null);
    const { username, token } = useContext(SetToken);
    const [subjectMessage, setSubjectMessage] = useState('');
    const [contentMessage, setContentMessage] = useState('');
    const createMessageHandler = () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        let formdata = new FormData();
        formdata.append("subject", subjectMessage);
        formdata.append("body", contentMessage);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${API.ipAddress}/new-message/${teamId}/`,
            requestOptions)
            .then(res => res.text())
            .catch(error => console.log(error))
        props.navigation.goBack();
    }
    return <ScrollView>
        <View>
            <Text style={PageStyle.title}>כתוב הודעה חדשה</Text>
            <View style={PageStyle.buttonStyleView}>
                <View style={InputStyle.inputContainerView}>
                    <TextInput
                        style={[InputStyle.bodyInput, { textAlign: 'right' }]}
                        placeholder="נושא ההודעה"
                        onChangeText={setSubjectMessage}
                        value={subjectMessage}
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                    /></View>
                <View style={InputStyle.inputContainerView}>
                    <TextInput
                        style={styles.contentMessage}
                        placeholder="תוכן ההודעה"
                        onChangeText={setContentMessage}
                        value={contentMessage}
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                        multiline={true}
                    /></View>
                <Button
                    onPress={createMessageHandler}
                    containerStyle={PageStyle.buttonStyle}
                    style={PageStyle.buttonTextStyle}>
                    שלח הודעה
                </Button>
            </View>
        </View>
    </ScrollView>
};

const styles = StyleSheet.create({
    contentMessage: {
        height: 250,
        paddingLeft: 20,
        paddingRight: 20,
        color: AppStyles.color.text,
        textAlign: 'right'
    }
})

export default CreateMessage;