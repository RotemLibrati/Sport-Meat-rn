import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const Team = props => {
    const teamClicked = (team) => {
        props.navigation.navigate("TeamDetails", {team: team});
    }
    return (
        <View style={{borderColor:'lightgrey',borderRadius:40,borderWidth:2,margin:2,width:300,alignItems:'center'}}>
            <TouchableOpacity onPress={() => teamClicked(props.team)}>
                    <Text style={styles.text}>שם הקבוצה: {props.team.name}</Text>
                    <Text style={styles.text}>ספורט: {props.team.sport}</Text>
                </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    name: {
        fontSize: 15
    },
    text: {
        textAlign: 'right',
        fontWeight: 'bold'
    }
})

export default Team;
