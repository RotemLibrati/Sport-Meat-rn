import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API from '../../ApiService';
import { View, Text, StyleSheet, Button, ScrollView, Platform } from 'react-native';
import Loading from '../Loading';
import Team from './Team';
import { SetToken } from '../../context/SetToken';

const Teams = props => {
    const { token, username } = useContext(SetToken);
    const [isLoading, setIsLoading] = useState(true);
    const [teams, setTeams] = useState([]);
    useEffect(() => {
        props.navigation.addListener('didFocus',
            payload => {
                fetchTeams();
            });
        const fetchTeams = async () => {
            let config = {
                method: 'get',
                url: `${API.ipAddress}/teams/${username}/`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            await axios(config).
                then(function (response) {
                    setTeams(response.data);
                    setIsLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });

        };
        fetchTeams();
    }, [username])
    const clickedAllTeams = () => {
        props.navigation.navigate("TeamsScreen", { navigation: props.navigation });
    }
    return (
        isLoading ? (<Loading />) : (
            <ScrollView style={styles.boxes}>
                <View style={styles.title}><Text style={styles.title} >הקבוצות שלי</Text></View>
                <View style={styles.teams}>
                    {teams.teams.map(team => (
                        <Team key={team.id} team={team} navigation={props.navigation} />
                    ))}
                </View>
                <View style={Platform.OS === 'android' && styles.button}>
                    <Button
                        title="לכל הקבוצות"
                        onPress={clickedAllTeams}
                    />
                </View>
            </ScrollView>
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
        marginTop: 15,
        alignItems: 'center'
    },
    boxes: {
        backgroundColor: '#e4e6eb',
        height: 200,
        margin: 16,
        borderRadius: 16,
        width: '80%'
    },
    button: {
        width: 100,
        marginLeft: 100,
        marginTop: 5
    }
})

export default Teams;
