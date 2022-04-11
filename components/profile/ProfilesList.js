import React from 'react';
import { FlatList, Text, View } from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';

const ProfilesList = props => {
    const users = props.members;
    const renderUsers = ({ item }) => (
        <ListItem bottomDivider onPress={() => props.onPressMember(item)}>
            {item.sex === 'זכר' ? <Avatar source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar2.png' }} />
            : <Avatar source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar3.png' }} /> }
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
            data={users}
            renderItem={renderUsers}
            keyExtractor={(item) => item.id.toString()}
        />
    )
    // return (
    //     <View><Text>rotem</Text></View>
    // )
};

export default ProfilesList;