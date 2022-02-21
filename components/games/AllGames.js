import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import API from '../../ApiService';
import Loading from '../Loading';
import Game from './Game';
import { SetToken } from '../../context/SetToken';
import { PageStyle } from '../styles/AppStyles';
import GamesInfo from './GamesInfo';

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
      <ScrollView>
        <View style={PageStyle.container}>
          <Text style={PageStyle.title}>המשחקים הבאים:</Text>
          {games.games.map(game => (
            <ScrollView style={[styles.boxes]}>
              <GamesInfo key={game.id} game={game} navigation={props.navigation} />
            </ScrollView>
          ))}
        </View>
      </ScrollView>
    )
  )
};

const styles = StyleSheet.create({
  boxes: {
    backgroundColor: '#e4e6eb',
    height: 120,
    margin: 16,
    borderRadius: 16,
    width: '80%'
  },
})

export default AllGames;

