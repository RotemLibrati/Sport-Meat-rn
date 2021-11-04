import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import API from '../../ApiService';
import Loading from '../Loading';
import Team from './Team';

const AllTeams = props => {
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchTeams = async () => {
            const result = await axios.get(`${API.ipAddress}/all-teams/admin`);
            setTeams(result.data);
            setIsLoading(false);
        };
        fetchTeams();
    }, []);
    const clickCreateTeam = () => {
        props.navigation.navigate("CreateNewTeam");
    }
    return (
        isLoading ? (<Loading />) : (
            <View style={styles.container}>
                <View>
                    {teams.teams.map(team => (
                        <Team key={team.id} team={team} navigation={props.navigation} />
                    ))}
                </View>
                <Button title="צור קבוצה חדשה" 
                    onPress={clickCreateTeam}
                />
            </View>
        )
    )
};
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
});


export default AllTeams;
