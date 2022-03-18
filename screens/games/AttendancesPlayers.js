import React from 'react';
import { FlatList, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import ProfilesList from '../../components/profile/ProfilesList';

const AttendancesPlayers = props => {
    const attendance = props.navigation.getParam("attendance", null);
    let userLists = attendance.map(item => item.profile);
    const onPressUser = (item) => {
        props.navigation.navigate("FriendsProfileScreen", { profile: item });
    }
    return (
        <View>
            <ProfilesList  members={userLists} onPressMember={onPressUser}/>
        </View>
    )
};
AttendancesPlayers.navigationOptions = () => {
    return {
        headerTitle: 'מגיעים לשחק',
    }
}

export default AttendancesPlayers;