import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import API from '../../ApiService';
import Game from './Game';
import Loading from '../Loading';
import { SetToken } from '../../context/SetToken';
const RecentGame = (props) => {
    const { token, username } = useContext(SetToken);
    const [isLoading, setIsLoading] = useState(true);
    const [games, setGames] = useState([]);

    useEffect(() => {

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
    }, [username])
    const clickAllGames = () => {
        props.navigation.navigate("GamesScreen", { navigation: props });
    };
    return (
        isLoading ? (<Loading />) : (
            <View style={styles.box}>
                <View style={styles.title}><Text style={styles.title} >משחקים קרובים</Text></View>
                <View style={styles.games}>
                    {games.games.map(game => (
                        <Game key={game.id} game={game} navigation={props.navigation} />
                    ))}
                </View>
                <View style={styles.button}>
                    <Button
                        title="לכל המשחקים"
                        onPress={clickAllGames}
                    />
                </View>
            </View>
        )
    )
};
const styles = StyleSheet.create({
    games: {
        marginTop: 50,
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
    }
})


export default RecentGame;

// useEffect(() => {
    //     setIsLoading(true);
    //     fetch(`${API.ipAddress}/recent-games/admin`, {
    //         method: 'GET'
    //     })
    //         .then(res => res.json())
    //         .then(res => setGames(res))
    //         .then(setIsLoading(false))
    //         .catch(error => console.log(error))
    //         .finally(() => setIsLoading(false))
    // })
    // if (isLoading) {
    //     return (
    //         <View>
    //             <Text>Data is Loading..</Text>
    //         </View>
    //     )
    // }
    // setIsLoading(false)