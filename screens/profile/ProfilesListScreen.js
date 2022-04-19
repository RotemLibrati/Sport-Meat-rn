import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import ProfilesList from '../../components/profile/ProfilesList';
import { SetToken } from '../../context/SetToken';
import API from '../../ApiService';
import axios from 'axios';
import Loading from '../../components/Loading';

const ProfilesListScreen = props => {
  const teamId = props.navigation.getParam("teamId", null);
  const { token } = useContext(SetToken);
  const [profiles, setProfiles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchProfiles = async () => {
      let config = {
        method: 'get',
        url: `${API.ipAddress}/profiles`,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      axios(config)
        .then(function (response) {
          setProfiles(response.data);
          console.log(response.data);
          setIsLoading(false);
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    fetchProfiles();
  }, []);
  const onPressUser = (item) => {
    props.navigation.navigate("FriendsProfileScreen", { profile: item });
  };
  const handleAddFriend = async (item) => {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      let formdata = new FormData();
      formdata.append("profileId", item.id);
      var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
      };

      await fetch(`${API.ipAddress}/team/${teamId}/`, requestOptions)
          .then(function (response) {
            alert("המשתמש הוסף");
          })
          .catch(error => console.log('error', error));
  };
  return (
    isLoading ? <Loading /> :
      (<View>
        <ProfilesList members={profiles} onPressMember={onPressUser} profilesTeam={true} handleAddFriend={handleAddFriend} teamAdmin={teamId} />
      </View>)
  );
};

export default ProfilesListScreen;

ProfilesListScreen.navigationOptions = (navData) => {
  return {
      headerTitle: 'רשימת משתמשים',
      headerStyle: {
          backgroundColor: "#ff5a66"
      },
      tabBarOptions: {
          activeTintColor: 'white'
      },

  }

}

const styles = StyleSheet.create({});