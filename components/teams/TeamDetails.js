import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, ScrollView, Alert } from 'react-native';
import { PageStyle, AppStyles, } from '../styles/AppStyles';
import Button from "react-native-button";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/HeaderButton';
import { SetToken } from '../../context/SetToken';
import API from '../../ApiService';
import axios from 'axios';
// import * as Linking from 'expo-linking';
import * as Linking from 'expo-linking';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';

const TeamDetails = props => {
    const { token, username } = useContext(SetToken);
    let team = props.navigation.getParam("team", null);
    const [teamUpdate, setTeamUpdate] = useState(team);
    const [isLoading, setIsLoading] = useState(true);
    const [clickFriends, setClickFriends] = useState(false);
    // useEffect(() => {
    //     props.navigation.addListener('didFocus',
    //         payload => {
    //             fetchTeam();
    //         });
    //     const fetchTeam = async () => {
    //         var config = {
    //             method: 'get',
    //             url: `${API.ipAddress}/team/${team.id}`,
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         };
    //         axios(config)
    //             .then(function (response) {
    //                 setTeamUpdate(response.data);
    //                 team = response.data;
    //                 setIsLoading(false);
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //     }
    //     fetchTeam();
    // }, []);
    const teamMessgaesHandler = () => {
        props.navigation.navigate("TeamMessages", { team: team });
    }
    const teamFriendsHandler = () => {
        const fetchTeam = async () => {
            var config = {
                method: 'get',
                url: `${API.ipAddress}/team/${team.id}/`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            await axios(config)
                .then(function (response) {
                    setTeamUpdate(response.data.team);
                    team = response.data.team;
                })
                .then(() => {
                    setIsLoading(false);
                })
                .catch(function (error) {
                    alert(error);
                });
        }
        fetchTeam();
        setClickFriends(true);
        // props.navigation.navigate("TeamFriends", { team: team });
    };
    useEffect(() => {
        if (!isLoading && clickFriends) {

            props.navigation.navigate("TeamFriends", { team: teamUpdate });
            setClickFriends(false);
        }
    }, [isLoading, clickFriends]);
    useEffect(() => {
        props.navigation.addListener('didFocus',
            payload => {
                fetchTeam();
            });
        const fetchTeam = async () => {
            var config = {
                method: 'get',
                url: `${API.ipAddress}/team/${team.id}/`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            await axios(config)
                .then(function (response) {
                    setTeamUpdate(response.data.team);
                    team = response.data.team;
                })
                .then(() => {
                    setIsLoading(false);
                })
                .catch(function (error) {
                    alert(error);
                });
        }
        fetchTeam();
    }, [])
    const removeTeam = async () => {
        Alert.alert('מחקת את הקבוצה !');

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();
        formdata.append("id", team.id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch(`${API.ipAddress}/delete-team`, requestOptions)
            .then(() => {
                props.navigation.goBack();
            })
            .catch(error => console.log('error', error));



    };
    const editTeam = () => {
        props.navigation.navigate("EditTeam", { team: team });
    }
    useEffect(() => {
        props.navigation.setParams({ remove: removeTeam, edit: editTeam, username: username, team: team });
        //Linking.openURL(`whatsapp://send?text=${Linking.getInitialURL()}&phone=+972525507563`);
    }, []);
    return (
        <ScrollView>
            <View style={PageStyle.container}>
                <Text style={PageStyle.title}>קבוצת {team.name}</Text>
                <View style={styles.boxes}>
                    <Text style={[PageStyle.TextStyle, styles.text]}>שם הקבוצה : {team.name}</Text>
                    <Text style={PageStyle.TextStyle}>מנהל הקבוצה : {team.admin.user.username}</Text>
                    <Text style={PageStyle.TextStyle}>סוג הספורט : {team.sport}</Text>
                    <Text style={PageStyle.TextStyle}>סוג הקבוצה : {team.type}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        containerStyle={styles.navigationContainer}
                        style={styles.navigationText}
                        onPress={teamMessgaesHandler}>
                        הודעות הקבוצה
                    </Button>
                    <Button
                        containerStyle={styles.attendanceContainer}
                        style={styles.attendanceText}
                        onPress={teamFriendsHandler}>
                        חברי הקבוצה
                    </Button>
                </View>

            </View>
            {team.admin.user.username === username &&
                <ActionButton buttonColor={AppStyles.color.tint}>
                    <ActionButton.Item buttonColor='#9b59b6' title="הוסף חברים" onPress={() => props.navigation.navigate("ProfilesListScreen", { teamId: team.id })}>
                        <FontAwesome5 name="user-friends" size={18} color="black" />
                    </ActionButton.Item>
                </ActionButton>
            }

        </ScrollView>
    )
};
const styles = StyleSheet.create({
    boxes: {
        alignItems: 'center',
        backgroundColor: '#e4e6eb',
        height: 200,
        margin: 16,
        borderRadius: 16,
        width: '80%'
    },
    text: {
        marginTop: "15%"
    },
    buttonsContainer: {
        // display: 'flex',
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: '20%'

    },
    navigationContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.tint,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
    },
    navigationText: {
        color: AppStyles.color.white,
    },
    attendanceContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.white,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        borderWidth: 1,
        borderColor: AppStyles.color.tint,
        marginTop: 30,
    },
    attendanceText: {
        color: AppStyles.color.tint,
    },
});

TeamDetails.navigationOptions = (navData) => {
    return {
        headerTitle: 'פרטי הקבוצה',
        headerRight: () =>

            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                {navData.navigation.getParam('username') === navData.navigation.getParam("team").admin.user.username &&
                    <React.Fragment>
                        <Item title="Delete" iconName="trash"
                            onPress={navData.navigation.getParam('remove')}
                        />
                        <Item title="Edit" iconName="edit"
                            onPress={navData.navigation.getParam('edit')}
                        />
                    </React.Fragment>
                }
            </HeaderButtons>


    }
}

export default TeamDetails;
