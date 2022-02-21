import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';
import { AppStyles } from '../styles/AppStyles';

const GamesInfo = (props) => {
    const gameClicked = (game) => {
        props.navigation.navigate("GameDetails", { game: game });
    };
    return (
        <View>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => gameClicked(props.game)} style={styles.context}>
                    <Text>תאריך: {props.game.event_time}</Text>
                    <Text>שם המגרש: {props.game.location.name}</Text>
                    <Text>מיקום: {props.game.location.region}</Text>
                    {props.game.team.anonymous ? (<Text></Text>) :
                        (<Text>קבוצה: {props.game.team.name}</Text>)}
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row-reverse',
        justifyContent: 'space-between'
    },
    context: {
        alignItems: 'flex-end',
        marginTop: 10
    },
});
export default GamesInfo;