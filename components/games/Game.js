import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

const Game = (props) => {
    const gameClicked = (game) => {
        props.navigation.navigate("GameDetails", {game: game});
    };
    return (
            <View style={{borderColor:'lightgrey',borderRadius:40,borderWidth:2,margin:2,width:300,alignItems:'center'}}>
                <TouchableOpacity onPress={() => gameClicked(props.game)}> 
                    <Text style={styles.text}>תאריך: {props.game.event_time}</Text>
                    <Text style={styles.text}>שם המגרש: {props.game.location.name}</Text>
                    <Text style={styles.text}>מיקום: {props.game.location.region}</Text>
                    {props.game.team.anonymous ? (<Text></Text>) :
                    ( <Text style={styles.text}>קבוצה: {props.game.team.name}</Text> ) }
                </TouchableOpacity>
            </View>
    );
}
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
    },
    text: {
        textAlign: 'right',
        fontWeight: 'bold'
    }
});
export default Game;
