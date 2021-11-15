import React, { useContext, useEffect, useState } from 'react';
import { Text, View, TouchableHighlight, FlatList } from 'react-native';
import { SetToken } from '../../context/SetToken';
import Loading from '../Loading';
import API from '../../ApiService';
import axios from 'axios';

const TeamMessages = props => {
    const team = props.navigation.getParam("team", null);
    const { username, token } = useContext(SetToken);
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
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
                    console.log(response.data);
                    setMessages(response.data);
                    setIsLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        fetchTeamMessages();
    }, []);
    const renderMessages = ({ item }) => (
        <TouchableHighlight underlayColor="rgba(73,182,77,0.9)">
            <View>
                <Text>{item.subject}</Text>
                <Text>{item.body}</Text>
            </View>
        </TouchableHighlight>
    );
    return (
        isLoading ? (<Loading/>) : (
        <View>
            <FlatList vertical showsVerticalScrollIndicator={false} numColumns={1} data={messages.messages} renderItem={renderMessages}
                    keyExtractor={(item) => item.id}
                />
        </View>
        )
    );
};

export default TeamMessages;
