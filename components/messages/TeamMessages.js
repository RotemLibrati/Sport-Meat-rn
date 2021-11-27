import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TouchableHighlight, FlatList, StyleSheet, KeyboardAvoidingView, TextInput, Button, ScrollView, Platform } from 'react-native';
import { SetToken } from '../../context/SetToken';
import Loading from '../Loading';
import API from '../../ApiService';
import axios from 'axios';

const TeamMessages = props => {
    const team = props.navigation.getParam("team", null);
    const { username, token } = useContext(SetToken);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [render, setRender] = useState(false);
    const [subjectMessage, setSubjectMessage] = useState("");
    const [contextMessage, setContextMessage] = useState("");
    useEffect(() => {
        const fetchTeamMessages = async () => {
            let config = {
                method: 'get',
                url: `${API.ipAddress}/team-messages/${team.id}/`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            await axios(config)
                .then(function (response) {
                    setMessages(response.data);
                    console.log(response.data);
                    setIsLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        fetchTeamMessages();
    }, []);
    const onPressMessage = (item) => {
        props.navigation.navigate("DetailsMessage", { message: item });
    }
    const renderMessages = ({ item }) => (
        <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressMessage(item)}>
            <View>
                <View style={{ borderWidth: 1 }}>
                    <View style={{ flexDirection: 'row-reverse', justifyContent: 'flex-start' }}>
                        <Text style={styles.item}>{item.subject}</Text>
                        {item.seen ? <Text></Text> :
                            <Text style={styles.notseen}>לא נקרא</Text>}
                    </View>
                    <Text>מאת: {item.sender.user.username}</Text>

                    <Text style={styles.date}>{item.timestamp}</Text>
                </View>

            </View>
        </TouchableHighlight>
    );
    const sendMessageHandler = () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        let formdata = new FormData();
        formdata.append("subject", subjectMessage);
        formdata.append("body", contextMessage);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${API.ipAddress}/new-message/${team.id}/`,
            requestOptions)
            .then(res => res.text())
            .catch(error => console.log(error))
        setContextMessage("");
        setSubjectMessage("");
    };
    return (
        isLoading ? (<Loading />) : (
            <View style={styles.container}>
                <FlatList vertical showsVerticalScrollIndicator={false} numColumns={1} data={messages.messages} renderItem={renderMessages}
                    keyExtractor={(item) => item.id}
                />
                <KeyboardAvoidingView
                    {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}
                    style={styles.container}>
                    <ScrollView style={styles.scrollView}
                        keyboardDismissMode={"interactive"}
                    >
                        <TextInput
                            style={styles.input} placeholder="נושא ההודעה"
                            value={subjectMessage}
                            onChangeText={(text) => setSubjectMessage(text)}
                        />
                        <TextInput style={styles.input} placeholder="כתוב הודעה"
                            value={contextMessage}
                            onChangeText={(text) => setContextMessage(text)}
                        />
                    </ScrollView>
                    <Button title="שלח הודעה"
                        onPress={sendMessageHandler}
                    />
                </KeyboardAvoidingView>
            </View>
        )
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
        textAlign: 'right',
    },
    item: {
        padding: 10,
        fontSize: 18,
        textAlign: 'right',
        height: 30
        //fontWeight: 'bold',

    },
    seen: {
        padding: 10,
        fontSize: 14,
        height: 44,
        textAlign: 'right',
        //fontWeight: 'bold',
    },
    notseen: {
        padding: 15,
        fontSize: 14,
        height: 0.2,
        textAlign: 'right',
        fontWeight: 'bold',
    },
    date: {
        fontSize: 14,

    },
    scrollView: {
        paddingHorizontal: 20,
    },
    input: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderColor: '#dbdbdb',
        padding: 10,
    },
});

export default TeamMessages;
