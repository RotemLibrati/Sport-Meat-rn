import React, { useState, useEffect, useContext } from 'react';
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
    const { token, username } = useContext(SetToken);
    const [myProfile, setMyProfile] = useState();
    const [isLoading, setIsLoading] = useState(true);
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
                console.log(response.data);
                setMyProfile(response.data);
                setIsLoading(false);
              })
              .catch(function (error) {
                console.log(error);
              });
        }
        fetchProfile();
    },[username]);
    const clickEditProfile = () => {
        props.navigation.navigate("EditProfile");
    }
    return (
        isLoading ? (<Loading />) :(
        <View>
            <MyProfile profile={myProfile}/>
        </View>
        )
    )
};

MyProfileScreen.navigationOptions = (navData, props) =>{
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
                onPress={() => navData.navigation.navigate("EditProfile")}
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
