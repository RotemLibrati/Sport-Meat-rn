import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const Game = (props) => {
    const gameClicked = (game) => {
        props.navigation.navigate("GameDetails", {game: game});
    };
    return (
        <View>
            <View>
                <TouchableOpacity onPress={() => gameClicked(props.game)}>
                    <Text>תאריך: {props.game.event_time}</Text>
                    <Text>מיקום: {props.game.location}</Text>
                    <Text>קבוצה: {props.game.team}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: 20
    }
});
export default Game;
