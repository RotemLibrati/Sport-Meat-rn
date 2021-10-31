import React from 'react';
import { View } from 'react-native';
import AllTeams from '../../components/teams/AllTeams';

const TeamsScreen = props => {
    return (
        <View>
            <AllTeams navigation={props.navigation}/>
        </View>
    )
};

TeamsScreen.navigationOptions = () => {
    return {
        headerTitle: "הקבוצות שלי"
    }
  };
export default TeamsScreen;
