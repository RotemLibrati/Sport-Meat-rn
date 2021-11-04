import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import MyProfile from '../../components/profile/MyProfile';
import axios from 'axios';
import API from '../../ApiService';
import Loading from '../../components/Loading';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/HeaderButton';
import EditProfile from '../../components/profile/EditProfile';

const MyProfileScreen = props => {
    const [myProfile, setMyProfile] = useState();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchProfile = async () => {
            const profile = await axios.get(`${API.ipAddress}/profiles/admin`)
            setMyProfile(profile.data);
            setIsLoading(false);
        }
        fetchProfile();
    },[]);

    return (
        isLoading ? (<Loading />) :(
        <View>
            <MyProfile profile={myProfile}/>
        </View>
        )
    )
};

MyProfileScreen.navigationOptions = navData =>{
    return {
        headerTitle: "הפרופיל שלי",
        headerStyle: {
            backgroundColor: "#00CED1"
        },
        tabBarOptions: {
            activeTintColor: 'white'
          },
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Edit" iconName="edit"
                onPress={() => console.log("Edit")}
            />
        </HeaderButtons>,
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName="menu"
          onPress={() => { navData.navigation.toggleDrawer() }} />
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
