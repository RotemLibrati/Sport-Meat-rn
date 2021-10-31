import React from 'react';
import { View, Text } from 'react-native'

const GameDetails = (props) => {
    const game = props.navigation.getParam("game", null);
    return (
        <View>
            <Text>זמן המשחק: {game.event_time}</Text>
            <Text>מיקום המשחק: {game.location}</Text>
            <Text>קבוצה: {game.team}</Text>
        </View>
    )
};

GameDetails.navigationOptions = () => {
    return {
        headerTitle: "פרטי משחק"
    }
  };

export default GameDetails;
