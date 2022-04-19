import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MyProfile from '../../components/profile/MyProfile';
import axios from 'axios';
import API from '../../ApiService';
import Loading from '../../components/Loading';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/HeaderButton';
import { SetToken } from '../../context/SetToken';

const FriendsProfileScreen = props => {
    const { token } = useContext(SetToken);
    const user = props.navigation.getParam('profile', null);
    const username = user.user.username;
    const [myProfile, setMyProfile] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [countTeams, setCountTeams] = useState(0);


    useEffect(() => {
        const fetchProfile = async () => {
            let config = {
                method: 'get',
                url: `${API.ipAddress}/profiles/${username}/`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            await axios(config)
                .then(function (response) {
                    setMyProfile(response.data);
                    setIsLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        const fetchCountTeams = async () => {
            let config = {
                method: 'get',
                url: `${API.ipAddress}/count-teams/${username}/`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            await axios(config)
                .then(function (response) {
                    setCountTeams(response.data.teams);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        fetchProfile();
        fetchCountTeams();
    }, [username]);
    useEffect(() => {
        if (myProfile) { //check that myProfile is not empty to send to EditProfile component 
            props.navigation.setParams({ profile: myProfile });
        }
    }, [myProfile]);
    return (
        isLoading ? (<Loading />) : (
            <View>
                <MyProfile profile={myProfile} countTeams={countTeams}/>
            </View>
        )
    )
};

FriendsProfileScreen.navigationOptions = (navData) => {
    //const pro = navData.navigation.state.params.profile.user;
    const name = navData.navigation.state.params.profile.user.username;
    return {
        headerTitle: `הפרופיל של ${name} `,
        headerStyle: {
            backgroundColor: "#ff5a66"
        },
        tabBarOptions: {
            activeTintColor: 'white'
        },

    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default FriendsProfileScreen;
