import React from 'react'
import { View, Text } from 'react-native';
import AllGames from '../../components/games/AllGames';

const GamesScreen = props => {
    return (
        <View>
            <AllGames navigation={props.navigation} />
        </View>
    );
};
GamesScreen.navigationOptions = () => {
    return {
        headerTitle: "כל המשחקים"
    }
  };

export default GamesScreen;
