import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const Team = props => {
    const teamClicked = (team) => {
        props.navigation.navigate("TeamDetails", {team: team});
    }
    return (
        <View>
            <TouchableOpacity onPress={() => teamClicked(props.team)}>
                    <Text style={styles.name}>שם הקבוצה: {props.team.name}</Text>
                    <Text>ספורט: {props.team.sport}</Text>
                </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    name: {
        fontSize: 15
    }
})

export default Team;
