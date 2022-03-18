import React from "react";
import { View } from 'react-native';
import ProfilesList from '../../components/profile/ProfilesList';
import * as Linking from 'expo-linking';
const InviteMembers = props => {
    const game = props.navigation.getParam("game");
    const onPressMember = (item) => {
        Linking.openURL(`whatsapp://send?text=אני מזמין אותך למשחק שנפתח בקבוצת ${game.team.name} בתאריך ${game.event_time} ב${game.location.name} ${game.location.region}&phone=+972525507563`);
    }
    return (
        <View>
            <ProfilesList members={game.team.members} onPressMember={onPressMember}/>
        </View>
    );
};

InviteMembers.navigationOptions = () => {
    return {
        headerTitle: 'הזמן חברים',
    }
}

export default InviteMembers;