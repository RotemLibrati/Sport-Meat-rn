import React, { useState, useContext, useEffect } from 'react';
import { View, Alert, TextInput, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { SetToken } from '../../context/SetToken';
import { AppStyles } from '../styles/AppStyles';
import API from '../../ApiService';
import axios from 'axios';
import Loading from '../Loading';

const ProfilesList = props => {
    const users = props.members;
    const [team, setTeam] = useState();
    const { token, username } = useContext(SetToken);
    const [search, setSearch] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [filterData, setFilterData] = useState(users);
    const [masterData, setMasterData] = useState(users);
    const [clicked, setClicked] = useState(false);
    let fromTeamDetails;
    let teamAdmin;
    try {
        fromTeamDetails = props.profilesTeam;
    } catch (e) {
        console.error(e);
    };
    try {
        teamAdmin = props.teamAdmin;
    } catch (e) {
        console.error(e.message);
    };
    useEffect(() => {
        if (teamAdmin) {
            props.navigation.addListener('didFocus',
                payload => {
                    fetchTeam();
                });
            const fetchTeam = async () => {
                let config = {
                    method: 'get',
                    url: `${API.ipAddress}/team/${props.teamAdmin}/`,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };
                axios(config)
                    .then(function (response) {
                        setTeam(response.data.team);
                        setIsLoading(false);
                    })
                    .catch(function (error) {
                        alert(error.message);
                    });
            }
            fetchTeam();
            setClicked(false);
        }
    }, [clicked]);
    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.user.username ? item.user.username.toUpperCase()
                    : ''.toUpperCase();
                const itemData2 = item.city ? item.city.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                const textData2 = text.toUpperCase();
                return itemData.indexOf(textData) > -1 || itemData2.indexOf(textData2) > -1;

            });
            setFilterData(newData);
            setSearch(text);
        } else {
            setFilterData(masterData);
            setSearch(text);
        }
    };
    const ItemView = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => props.onPressMember(item)}>
                <ListItem bottomDivider >
                    {item.sex === 'זכר' ? <Avatar source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar2.png' }} />
                        : <Avatar source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar3.png' }} />}
                    <ListItem.Content>
                        <ListItem.Title
                        >{item.user.username}</ListItem.Title>
                        <ListItem.Subtitle
                        >{item.city}</ListItem.Subtitle>
                    </ListItem.Content>

                    {!isLoading && !team.members.some(el => el.user.username === item.user.username) && !clicked && <Ionicons name="ios-person-add" size={24} color="black" onPress={() => {
                        setClicked(true);
                        props.handleAddFriend(item);
                    }} />}

                </ListItem>
            </TouchableOpacity>
        )
    };
    const ItemSeparatorView = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: AppStyles.color.tint }} />
        )
    };
    return (
        <View>
            <TextInput
                style={styles.textInputStyle}
                value={search}
                placeholder="חיפוש משתמש"
                underlineColorAndroid="transparent"
                onChangeText={(text) => searchFilter(text)}

            />
            <FlatList
                data={filterData}
                keyExtractor={(item, index) => index.toString()}
                ItemSeparatorComponent={ItemSeparatorView}
                renderItem={ItemView}
            />
        </View>
    )
};
const styles = StyleSheet.create({
    itemStyle: {
        padding: 10
    },
    textInputStyle: {
        height: 50,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: AppStyles.color.tint,
        backgroundColor: 'white',
        textAlign: 'right',
    }
});

export default ProfilesList;