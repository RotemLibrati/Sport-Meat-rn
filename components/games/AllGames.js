import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import API from '../../ApiService';
import Loading from '../Loading';
import Game from './Game';
import { SetToken } from '../../context/SetToken';

const AllGames = props => {
    const { token, username } = useContext(SetToken);
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        var config = {
            method: 'get',
            url: `${API.ipAddress}/games/${username}/`,
            headers: { 
              'Authorization': `Bearer ${token}`
            }
          };
        const fetchGames = async () => {
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
    return (
        isLoading ? (<Loading />) : (
            <View style={{backgroundColor:"white"}} >
            {games.games.map(game => (
                <Game key={game.id} game={game} navigation={props.navigation} />
            ))}
        </View> 
        )
    )
};

export default AllGames;

