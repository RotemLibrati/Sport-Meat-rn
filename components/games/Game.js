import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const Game = (props) => {
    const gameClicked = (game) => {
        props.navigation.navigate("GameDetails", {game: game});
    };
    return (
        <View>
            <View>
                <TouchableOpacity onPress={() => gameClicked(props.game)}> 
                    <Text>תאריך: {props.game.event_time}</Text>
                    <Text>שם המגרש: {props.game.location.name}</Text>
                    <Text>מיקום: {props.game.location.region}</Text>
                    {props.game.team.anonymous ? (<Text></Text>) :
                    ( <Text>קבוצה: {props.game.team.name}</Text> ) }
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
