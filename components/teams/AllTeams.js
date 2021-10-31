import React, {useState, useEffect} from 'react';
import { Text, View } from 'react-native';
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
    }, [])
    return (
        isLoading ? (<Loading />) : (
        <View>
            {teams.teams.map(team => (
                <Team key={team.id} team={team} navigation={props.navigation} />
            ))}
        </View>
        )
    )
}

export default AllTeams;
