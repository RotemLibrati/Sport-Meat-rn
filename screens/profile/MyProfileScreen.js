import React, { useState, useEffect, useContext, useCallback } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MyProfile from '../../components/profile/MyProfile';
import axios from 'axios';
import API from '../../ApiService';
import Loading from '../../components/Loading';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/HeaderButton';
import EditProfile from '../../components/profile/EditProfile';
import { SetToken } from '../../context/SetToken';

const MyProfileScreen = props => {
    const { token, username, editProfile, edit } = useContext(SetToken);
    const [myProfile, setMyProfile] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [render, setRender] = useState(false);

    useEffect(() => {
        props.navigation.addListener('didFocus',
        payload => {
          fetchProfile();
        });
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
                    //editProfile(edit);
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        fetchProfile();
    }, []);
    

    // useEffect(() => {
    //     setTimeout(() => {
    //         setRender(!render);
    //     }, 10000);
    // }, [render]);
    useEffect(() => {
        if (myProfile) { //check that myProfile is not empty to send to EditProfile component 
            props.navigation.setParams({ profile: myProfile });
        }
    }, [myProfile]);
    return (
        isLoading ? (<Loading />) : (
            <View>
                <MyProfile profile={myProfile} />
            </View>
        )
    )
};

MyProfileScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "הפרופיל שלי",
        headerStyle: {
            backgroundColor: "#ff5a66"
        },
        tabBarOptions: {
            activeTintColor: 'white'
        },
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Edit" iconName="edit"
                onPress={() => navData.navigation.navigate("EditProfile", {
                    profile: navData.navigation.getParam('profile'),

                })} 
                color="black"

            />
        </HeaderButtons>,
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item
                title="Menu"
                iconName="menu"
                onPress={() => { navData.navigation.toggleDrawer() }} 
                color="black"
                />
        </HeaderButtons>

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

export default MyProfileScreen;
