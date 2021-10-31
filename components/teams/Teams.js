import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API from '../../ApiService';
import { View, Text, StyleSheet } from 'react-native';
import Loading from '../Loading';
import Team from './Team';

const Teams = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        const fetchTeams = async () => {
            const result = await axios.get(`${API.ipAddress}/teams/admin`);
            setTeams(result.data);
            setIsLoading(false);
        };
        fetchTeams();
    }, [])
    console.log(teams);
    return (
        isLoading ? (<Loading /> ) : (
        <View style={styles.box}>
            <View style={styles.title}><Text style={styles.title} >הקבוצות שלי</Text></View>
            <View style={styles.teams}>
                    {teams.teams.map(team => (
                        <Team key={team.id} team={team} navigation={props.navigation}/>
                    ))}
                </View>
        </View>
        )
    )
};
const styles = StyleSheet.create({
    box: {
        marginTop: 50,
        flex: 0.3,
        backgroundColor: "beige",
        borderWidth: 5,
        width: '70%',
    },
    title: {
        fontSize: 20,
        alignItems: 'center'
    },
    teams: {
        marginTop: 50,
        alignItems: 'center'
    },
})

export default Teams;
