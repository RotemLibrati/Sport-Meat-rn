import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableHighlight, Image } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

const TeamFriends = props => {
    const team = props.navigation.getParam("team", null);
    const onPressUser = (item) => {
        props.navigation.navigate("FriendsProfileScreen", { profile: item });
    }
    const renderFriends = ({ item }) => (
        <ListItem bottomDivider onPress={() => onPressUser(item)}>
            <Avatar source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar2.png' }} />
            <ListItem.Content>
                <ListItem.Title
                >{item.user.username}</ListItem.Title>
                <ListItem.Subtitle
                >{item.city}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )
    return (
        <FlatList

            data={team.members}
            renderItem={renderFriends}
            keyExtractor={(item) => item.id.toString()}
        />
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});
TeamFriends.navigationOptions = (navData) => {
    return {
        headerTitle: 'חברי הקבוצה',
    }
};

export default TeamFriends;
