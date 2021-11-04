import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import API from '../../ApiService';
import Loading from '../Loading';
import Game from './Game';

const AllGames = props => {
    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchGames = async () => {
            const result = await axios.get(`${API.ipAddress}/games/admin`);
            setGames(result.data);
            setIsLoading(false);
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

