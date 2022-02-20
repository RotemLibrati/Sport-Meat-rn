import React from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

const AttendancesPlayers = props => {
    const attendance = props.navigation.getParam("attendance", null);
    const onPressUser = (item) => {
        props.navigation.navigate("FriendsProfileScreen", { profile: item });
    }
    const renderAttendances = ({ item }) => (
        <ListItem bottomDivider onPress={() => onPressUser(item.profile)}>
            <Avatar source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar2.png' }} />
            <ListItem.Content>
                <ListItem.Title
                >{item.profile.user.username}</ListItem.Title>
                <ListItem.Subtitle
                >{item.profile.city}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
    return (
        <FlatList
            data={attendance}
            renderItem={renderAttendances}
            keyExtractor={(item) => item.profile.id.toString()}
        />
    )
};
AttendancesPlayers.navigationOptions = () => {
    return {
        headerTitle: 'מגיעים לשחק',
    }
}

export default AttendancesPlayers;