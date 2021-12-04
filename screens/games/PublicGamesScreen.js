import React from 'react';
import { View, Text } from 'react-native';
import PublicGames from '../../components/games/PublicGames';

const PublicGamesScreen = props => {
    return (
        <View>
            <PublicGames navigation={props.navigation}/>
        </View>
    );
};
PublicGamesScreen.navigationOptions = () => {
    return {
        headerTitle: "משחקים קרובים"
    }
  };

export default PublicGamesScreen;