import React, {useContext, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SetToken } from '../../context/SetToken';
import ApiService from '../../ApiService';
const DetailsMessage = props => {

    const message = props.navigation.getParam("message", null);
    const { token } = useContext(SetToken);
    const saveMessageHandler = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();
        formdata.append("seen", 1);


        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch(`${ApiService.ipAddress}/message/${message.id}/`, requestOptions)
            .then(function (response) {
                response.json();
            })
            .catch(error => console.log('error', error));

    };
    useEffect(() => {
        saveMessageHandler();
    }, [])
    return (
        <View>
            <Text style={styles.title}>{message.subject}</Text>
            <Text style={styles.content}>{message.body}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center',
        alignContent: 'center',
        
    },
    content: {
        fontSize: 18,
        textAlign: 'right',
        alignContent: 'center'
    }
});
DetailsMessage.navigationOptions = (navData) => {
    return {
        headerTitle: 'פרטי הודעה',
    }
}

export default DetailsMessage;
;