import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import API from '../../ApiService';
import Game from './Game';
import Loading from '../Loading';
import { SetToken } from '../../context/SetToken';
const RecentGame = (props) => {
    const { token, username } = useContext(SetToken);
    const [isLoading, setIsLoading] = useState(true);
    const [games, setGames] = useState([]);

    useEffect(() => {
        props.navigation.addListener('didFocus',
            payload => {
                fetchGames();
            });
        const fetchGames = async () => {
            const auth = `Bearer ${token}`
            let config = {
                method: 'get',
                url: `${API.ipAddress}/recent-games/${username}/`,
                headers: {
                    'Authorization': `${auth}`
                }
            }
            await axios(config)
                .then(function (response) {
                    setGames(response.data);
                    setIsLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        fetchGames();
    }, [])
    const clickAllGames = () => {
        props.navigation.navigate("GamesScreen", { navigation: props });
    };
    return (
        isLoading ? (<Loading />) : (
            <ScrollView style={styles.boxes}>
                <View style={styles.title}><Text style={styles.title} >משחקים קרובים</Text></View>
                <View style={styles.games}>
                    {games.games.map(game => (
                        <Game key={game.id} game={game} navigation={props.navigation} />
                    ))}
                </View>
                <Button
                    title="לכל המשחקים"
                    onPress={clickAllGames}
                />
            </ScrollView>
        )
    )
};
const styles = StyleSheet.create({
    games: {
        marginTop: 15,
        alignItems: 'center'
    },
    box: {
        flex: 0.5,
        backgroundColor: "beige",
        borderWidth: 5,
        width: '70%',
    },
    title: {
        fontSize: 20,
        alignItems: 'center'
    },
    button: {
        margin: 50
    },
    boxes: {
        backgroundColor: '#e4e6eb',
        height: 220,
        margin: 16,
        borderRadius: 16,
        width: '80%',
        marginTop: 0
    }
})


export default RecentGame;