import React, { useEffect, useState, useContext } from 'react';
import { Text, View, StyleSheet, FlatList, TextInput } from 'react-native';
import axios from 'axios';
import API from '../../ApiService';
import { SetToken } from '../../context/SetToken';
import Loading from '../Loading';
import { ListItem } from 'react-native-elements';

const PublicGames = () => {
    const { token, username } = useContext(SetToken);
    const [filterData, setFilterData] = useState([]);
    const [masterData, setMasterData] = useState([]);
    const [search, setSearch] = useState('');

    const [games, setGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        var config = {
            method: 'get',
            url: `${API.ipAddress}/public-games`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };
        const fetchGames = async () => {
            await axios(config)
                .then(function (response) {
                    setFilterData(response.data.games);
                    setMasterData(response.data.games);
                    setIsLoading(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        fetchGames();
    }, []);
    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.location.region ? item.location.region.toUpperCase() 
                : ''.toUpperCase();
                const itemData2 = item.team.name ? item.team.name.toUpperCase() 
                : ''.toUpperCase();
                const textData = text.toUpperCase();
                const textData2 = text.toUpperCase();
                return itemData.indexOf(textData) > -1 || itemData2.indexOf(textData2) > -1;

            });
            setFilterData(newData);
            setSearch(text);
        } else {
            setFilterData(masterData);
            setSearch(text);
        }
    }

    const ItemView = ({ item }) => {
        console.log({ item });
        return (
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title
                    >{item.team.name}</ListItem.Title>
                    <ListItem.Subtitle
                    >{item.location.region}</ListItem.Subtitle>
                    <ListItem.Subtitle
                    >{item.event_time}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    };
    const ItemSeparatorView = () => {
        return (
            <View
                style={{ height: 0.5, width: '100%', backgroundColor: '#c8c8c8' }}
            />

        )
    }
    return (
        isLoading ? (<Loading />) : (
            <View>
                <TextInput 
                    style={styles.textInputStyle}
                    value={search}
                    placeholder="חיפוש משחק"
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => searchFilter(text)}
                    
                />
                <FlatList
                    data={filterData}
                    keyExtractor={(item, index) => index.toString()}
                    ItemSeparatorComponent={ItemSeparatorView}
                    renderItem={ItemView}
                />
            </View>
        )
    )
};
const styles = StyleSheet.create({
    itemStyle: {
        padding: 10
    },
    textInputStyle: {
        height: 50,
        borderWidth: 1,
        paddingLeft: 20,
        margin: 5,
        borderColor: '#009688',
        backgroundColor: 'white'
    }
});

export default PublicGames;
