import React, { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import API from '../../ApiService';
import axios from 'axios';
import { SetToken } from '../../context/SetToken';
import Loading from '../../components/Loading';
import GameFieldList from '../../components/gamefield/GameFieldList';

const CreateNewGamePage2 = props => {
    const { token } = useContext(SetToken);
    const date = props.navigation.getParam("date", null);
    const time = props.navigation.getParam("time", null);
    const type = props.navigation.getParam("type", null);
    const limitParticipants = props.navigation.getParam("limitParticipants", null);
    const team = props.navigation.getParam("team", null);
    const city = props.navigation.getParam("city", null);
    const [isLoading, setIsLoading] = useState(true);
    const [gameField, setGameField] = useState([]);
    useEffect(() => {
        const fetchGameField = async () => {
            let config = {
                method: 'get',
                url: `${API.ipAddress}/city/${city}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            await axios(config)
                .then(function (response) {
                    setGameField(response.data);
                    setIsLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        fetchGameField();
    }, [])
    return (
        isLoading ? (<Loading />) : (
            <GameFieldList gameField={gameField} date={date} time={time}
                type={type} limitParticipants={limitParticipants} team={team} navigation={props.navigation} />
        )
    )
};

CreateNewGamePage2.navigationOptions = (navData) => {
    return {
        headerTitle: "בחר מגרש"
    }
};

export default CreateNewGamePage2;