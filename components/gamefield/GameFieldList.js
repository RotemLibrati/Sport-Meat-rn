import React, { useState, useContext } from 'react';
import { View, Alert, TextInput, FlatList, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { ListItem } from 'react-native-elements';
import { AppStyles } from '../styles/AppStyles';
import API from '../../ApiService';
import { SetToken } from '../../context/SetToken';
import { MaterialIcons } from '@expo/vector-icons';

const GameFieldList = props => {
    const { token } = useContext(SetToken);
    const [search, setSearch] = useState('');
    const [filterData, setFilterData] = useState(props.gameField);
    const [masterData, setMasterData] = useState(props.gameField);
    const searchFilter = (text) => {
        if (text) {
            const newData = masterData.filter((item) => {
                const itemData = item.name ? item.name.toUpperCase()
                    : ''.toUpperCase();
                const itemData2 = item.region ? item.region.toUpperCase()
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
    };
    const createGameHandler = (item) => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        let formdata = new FormData();
        formdata.append("team", props.team);
        formdata.append("location", item.id);
        formdata.append("date", props.date);
        formdata.append("time", props.time);
        formdata.append("type", props.type);
        formdata.append("limitParticipants", props.limitParticipants);
        formdata.append("typeTeam", props.typeTeam);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };//

        fetch(`${API.ipAddress}/create-game`,
            requestOptions)
            .then(function () {
                if (item.payment) {
                    props.navigation.navigate("PaymentScreen", { date: props.date, time: props.time, location: item.name });
                } else {
                    Alert.alert("יצרת משחק חדש");
                    props.navigation.popToTop();
                }
            })
            .catch(error => console.log(error));
    };
    const editGameHandler = (item) => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        let formdata = new FormData();
        formdata.append("location", item.id);
        formdata.append("limitParticipants", props.limitParticipants);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };//

        fetch(`${API.ipAddress}/update-game/${props.game.id}/`,
            requestOptions)
            .then(function () {
                if (item.availability.includes("תשלום")) {
                    props.navigation.navigate("PaymentScreen", { date: props.date, time: props.time, location: item.name });
                } else {
                    Alert.alert("עדכנת את פרטי המשחק");
                    props.navigation.popToTop();
                }
            })
            .catch(error => console.log(error));
    };
    const ItemView = ({ item }) => {
        return (
            <TouchableOpacity onPress={!props.editGame ? () => createGameHandler(item) : () => editGameHandler(item)}>

                <ListItem bottomDivider>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <ListItem.Content>
                            <ListItem.Title
                            >{item.name}</ListItem.Title>
                            <ListItem.Subtitle
                            >{item.street}</ListItem.Subtitle>
                            <ListItem.Subtitle
                            >{item.region}</ListItem.Subtitle>
                        </ListItem.Content>
                        <View style={{ marginTop: 15, marginRight: 15 }}>
                            <MaterialIcons name="payment" size={24} color="black" />
                        </View>

                    </View>
                </ListItem>

            </TouchableOpacity>

        )
    };
    const ItemSeparatorView = () => {
        return (
            <View style={{ height: 0.5, width: '100%', backgroundColor: AppStyles.color.tint }} />
        )
    };
    return (
        <View>
            <TextInput
                style={styles.textInputStyle}
                value={search}
                placeholder="חיפוש מגרש"
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
        borderColor: AppStyles.color.tint,
        backgroundColor: 'white',
        textAlign: 'right',
    }
});
export default GameFieldList;