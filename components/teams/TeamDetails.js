import React from 'react';
import { FlatList, Text, View, Button } from 'react-native';
import uuid from 'react-native-uuid';


const TeamDetails = props => {
    const team = props.navigation.getParam("team", null);
    const teamMessgaesHandler = () => {
        props.navigation.navigate("TeamMessages", {team: team});
    }
    return (
        <View>
            <Text>שם הקבוצה : {team.name}</Text>
            <Text>מנהל הקבוצה : {team.admin.user.username}</Text>
            <Text>סוג הספורט : {team.sport}</Text>
            <Text>חברי הקבוצה:</Text>
            {team.members.map(mem => (<Text key={uuid.v4()} >{mem.user.username}</Text>))}

            <Button 
                title="הודעות הקבוצה"
                onPress={teamMessgaesHandler}
            />
        </View>
    )
};

export default TeamDetails;
