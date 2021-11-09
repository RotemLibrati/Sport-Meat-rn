import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import API from '../../ApiService';
import Loading from '../Loading';
import Team from './Team';
import { SetToken } from '../../context/SetToken';

const AllTeams = props => {
    const { token, username } = useContext(SetToken);
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchTeams = async () => {
            let config = {
                method: 'get',
                url: `${API.ipAddress}/all-teams/${username}/`,
                headers: { 
                    'Authorization': `Bearer ${token}`
                  }
            };
            await axios(config)
                .then(function (response) {
                    setTeams(response.data);
                    setIsLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });  
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
