import React from 'react';
import { View } from 'react-native';
import AllTeams from '../../components/teams/AllTeams';

const TeamScreen = () => {
    return (
        <View>
            <AllTeams navigation={props.navigation}/>
        </View>
    )
};

TeamScreen.navigationOptions = () => {
    return {
        headerTitle: "הקבוצות שלי"
    }
  };
export default TeamScreen;
