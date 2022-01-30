import React, { useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, FlatList, Image, TouchableHighlight, Dimensions, ScrollView, LogBox } from 'react-native';
import axios from 'axios';
import API from '../../ApiService';
import Loading from '../Loading';
import { SetToken } from '../../context/SetToken';
import { PageStyle } from "../../components/styles/AppStyles";
import Button from "react-native-button";


const TEAM_ITEM_HEIGHT = 150;
const TEAM_ITEM_MARGIN = 20;
const teamNumColums = 2;
const { width, height } = Dimensions.get("window");
const SCREEN_WIDTH = width < height ? width : height;
const AllTeams = props => {
    const { token, username } = useContext(SetToken);
    const [teams, setTeams] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        props.navigation.addListener('didFocus',
        payload => {
            fetchTeams();
        });
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
    };
    const onPressTeam = (item) => {
        props.navigation.navigate("TeamDetails", { team: item });
    };
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, [])
    const renderTeams = ({ item }) => (
        <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressTeam(item)}>
            <View style={styles.container}>
                <Image style={styles.photo} source={item.sport == 'כדורגל' ? require('../../assets/pictures/soccer.jpg')
                    : item.sport == 'כדורסל' ? require('../../assets/pictures/basketball.jpg') :
                        require('../../assets/pictures/tennis.jpg')} />
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.category}>{item.sport}</Text>
            </View>
        </TouchableHighlight>
    );
    return (
        isLoading ? (<Loading />) : (
            <ScrollView>
                <View>
                    <Text style={PageStyle.title}>הקבוצות שלי</Text>
                    <FlatList
                        vertical showsVerticalScrollIndicator={false}
                        numColumns={2}
                        data={teams.teams}
                        renderItem={renderTeams}
                        keyExtractor={(item) => item.id}
                    />
                </View>
                <View style={PageStyle.buttonStyleView}>
                    <Button
                        onPress={clickCreateTeam}
                        containerStyle={[PageStyle.buttonStyle, { marginTop: 50 }]}
                        style={PageStyle.buttonTextStyle}>
                        צור קבוצה חדשה
                    </Button>
                </View>
            </ScrollView>


        )
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: TEAM_ITEM_MARGIN,
        marginTop: 20,
        width: (SCREEN_WIDTH - (teamNumColums + 1) * TEAM_ITEM_MARGIN) / teamNumColums,
        height: TEAM_ITEM_HEIGHT + 75,
        borderColor: '#cccccc',
        borderWidth: 0.5,
        borderRadius: 15
    },
    photo: {
        width: (SCREEN_WIDTH - (teamNumColums + 1) * TEAM_ITEM_MARGIN) / teamNumColums,
        height: TEAM_ITEM_HEIGHT,
        borderRadius: 15,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0
    },
    title: {
        flex: 1,
        fontSize: 17,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#444444',
        marginTop: 3,
        marginRight: 5,
        marginLeft: 5,
    },
    category: {
        marginTop: 5,
        marginBottom: 5
    }
});


export default AllTeams;
