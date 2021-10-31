import React from 'react';
import { FlatList, Text, View } from 'react-native';
import uuid from 'react-native-uuid';


const TeamDetails = props => {
    const team = props.navigation.getParam("team", null);
    return (
        <View>
            <Text>שם הקבוצה : {team.name}</Text>
            <Text>מנהל הקבוצה : {team.admin}</Text>
            <Text>סוג הספורט : {team.sport}</Text>
            <Text>חברי הקבוצה:</Text>
            {team.members.map(mem => (<Text key={uuid.v4()} >{mem}</Text>))}
        </View>
    )
};

export default TeamDetails;
