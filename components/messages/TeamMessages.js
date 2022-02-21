import React, { useContext, useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet, KeyboardAvoidingView, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SetToken } from '../../context/SetToken';
import Loading from '../Loading';
import API from '../../ApiService';
import axios from 'axios';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/HeaderButton';
import { PageStyle } from '../styles/AppStyles';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const TeamMessages = props => {
    const team = props.navigation.getParam("team", null);
    const { username, token } = useContext(SetToken);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteMessage, setDeleteMessage] = useState(true);
    
    useEffect(() => {
        props.navigation.addListener('didFocus',
            payload => {
                fetchTeamMessages();
            });
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
                    setIsLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        fetchTeamMessages();
    }, [deleteMessage]);
    const onPressMessage = (item) => {
        props.navigation.navigate("DetailsMessage", { message: item });
    };
    const newMessageClicked = () => {
        props.navigation.navigate("CreateMessage", { teamId: team.id });
    }
    useEffect(() => {
        props.navigation.setParams({ createMessage: newMessageClicked });
    }, []);
    const deleteMessageHandler = (messageId) => {
        var requestOptions = {
            method: 'DELETE',
            redirect: 'follow'
        };
        fetch(`${API.ipAddress}/delete-message/${messageId}/`, requestOptions)
            .then( function (response) {
                response.text();
                setDeleteMessage(!deleteMessage);
            }) 
            .catch(error => console.log('error', error));
    }
    const renderMessages = ({ item }) => (
        <TouchableOpacity
            onPress={() => onPressMessage(item)}>
            <View style={styles.messageContainer}>
                <Text style={styles.subject}>{item.subject}</Text>
                <View style={styles.contentStyle}>
                    <View>
                        {item.seen ? <Text></Text> :
                            <Text style={styles.unseen}>לא נקרא</Text>}
                        <Text>מאת: {item.sender.user.username}</Text>
                        <Text>{item.timestamp}</Text>
                    </View>
                    {((team.admin.user.username === username) || (username === item.sender.user.username)) &&
                        <View>
                            <Button
                                onPress={() => deleteMessageHandler(item.id)}
                                buttonStyle={styles.buttonStyle}
                                icon={
                                    <Ionicons
                                        name="trash-outline"
                                        size={17}
                                        color="black" />}
                            />
                        </View>}
                </View>
            </View>
        </TouchableOpacity>
    );
    return (
        isLoading ? (<Loading />) : (
            <View style={styles.container}>
                <Text style={PageStyle.title}>הודעות הקבוצה</Text>
                <FlatList showsVerticalScrollIndicator={false} numColumns={1} data={messages.messages} renderItem={renderMessages}
                    keyExtractor={(item) => item.id} />
            </View>
        )
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageContainer: {
        borderWidth: 1,
        width: 410,
        marginTop: 1
    },
    subject: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
    },
    unseen: {
        fontWeight: 'bold'
    },
    contentStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    buttonStyle: {
        backgroundColor: 'red',
        marginRight: 7
    }
});
TeamMessages.navigationOptions = (navData) => {
    return {
        headerTitle: 'הודעות הקבוצה',
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="New-Message" iconName="new-message"
                onPress={navData.navigation.getParam('createMessage')}
            />
        </HeaderButtons>
    }
};
export default TeamMessages;
