import React, { useState, useEffect, useContext } from "react";
import { View, Text, ScrollView } from 'react-native';
import { PageStyle } from "../../components/styles/AppStyles";
import { SetToken } from "../../context/SetToken";
import axios from "axios";
import API from '../../ApiService';
import Notification from "../../components/notification/Notification";
import Loading from "../../components/Loading";

const NotificationScreen = (props) => {
    const { username, token } = useContext(SetToken);
    const [notification, setNotification] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        props.navigation.addListener('didFocus',
            payload => {
                fetchNotification();
            });
        const fetchNotification = async () => {
            let config = {
                method: 'get',
                url: `${API.ipAddress}/notification/${username}/`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            await axios(config)
                .then(function (response) {
                    console.log(response.data);
                    setNotification(response.data);
                    setIsLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        fetchNotification();
    }, []);
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`${API.ipAddress}/notification-is_seen/${username}/`, requestOptions)
            .then(function (response) {
                response.json();
            })
            .catch(error => console.log('error', error));
    }, []);
    return (
        isLoading ? (<Loading />) : (
            <ScrollView> 
                <View style={PageStyle.container}>
                    {notification.notification.map(noti => (
                        <Notification key={noti.id} notification={noti} />
                    ))}
                </View>
            </ScrollView>
        ))
};

export default NotificationScreen;