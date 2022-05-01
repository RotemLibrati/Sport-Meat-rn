import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TextInput, Alert } from 'react-native';
import { PageStyle, InputStyle, AppStyles } from '../../components/styles/AppStyles';
import Button from "react-native-button";
import { Switch } from 'react-native-elements';
import { SetToken } from '../../context/SetToken';
import axios from 'axios';
import API from '../../ApiService';

const EditGameDetails = props => {
    const game = props.navigation.getParam("game");
    const { token } = useContext(SetToken);
    const [limitParticipants, setLimitParticipants] = useState(game.limit_paticipants);
    const [city, setCity] = useState(game.location.region);
    const [cityDoesntExist, setCityDoesntExist] = useState(false);
    const [checked, setChecked] = useState(false);

    const createGameHandler = () => {
        props.navigation.navigate("CreateNewGamePage2", {
            date: game.date, team: game.team, time: game.event_time, type: game.type,
            limitParticipants: limitParticipants, city: city, editGame: true, game: game
        });
    };
    const setCityHandler = () => {
        const fetchCity = async () => {
            let config = {
                method: 'get',
                url: `${API.ipAddress}/city/${city}`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            await axios(config)
                .then(function (response) {
                    response.data.length > 0 ? createGameHandler() : setCityDoesntExist(true)
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        fetchCity();
    };
    const editGameHandler = (item) => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        let formdata = new FormData();
        formdata.append("location", game.location.id);
        formdata.append("limitParticipants", limitParticipants);

        let requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };//

        fetch(`${API.ipAddress}/update-game/${game.id}/`,
            requestOptions)
            .then(function () {
                Alert.alert("עדכנת את פרטי המשחק");
                props.navigation.popToTop();
            })
            .catch(error => console.log(error));
    };
    return (
        <ScrollView>
            <View style={PageStyle.container}>
                <Text style={PageStyle.title}>עריכת פרטי משחק</Text>
                <Text style={PageStyle.TextStyle}>בחר כמות משתתפים</Text>
                <View style={[InputStyle.inputContainerView, { marginTop: 10 }]}>
                    <TextInput
                        style={styles.bodyInputButton}
                        placeholder={game.limit_participants.toString()}
                        onChangeText={setLimitParticipants}
                        value={limitParticipants}
                        keyboardType="numeric"
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                    /></View>
                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 20 }}>
                    <Text style={PageStyle.TextStyle}>האם לשנות מגרש ?</Text>
                    <Text>  </Text>
                    <Switch
                        value={checked}
                        onValueChange={(value) => setChecked(value)}
                    />
                </View>
                {checked ? <React.Fragment>
                    <Text style={[PageStyle.TextStyle, { marginTop: 30 }]}>בחר עיר</Text>
                    <View style={[InputStyle.inputContainerView, { marginTop: 10 }]}>
                        <TextInput
                            style={styles.bodyInputButton}
                            placeholder={game.location.region}
                            onChangeText={setCity}
                            value={city}
                            placeholderTextColor={AppStyles.color.grey}
                            underlineColorAndroid="transparent"
                        /></View>
                    {/* <Button
                    onPress={() => createGameHandler()}
                    containerStyle={[PageStyle.buttonStyle, {marginTop: 60}]}
                    style={PageStyle.buttonTextStyle}>
                    בחר מגרש
                </Button> */}
                    <View style={PageStyle.buttonStyleView}>
                        {cityDoesntExist && <Text>עיר לא קיימת</Text>}
                        <Button
                            disabled={city ? false : true}
                            onPress={setCityHandler}
                            containerStyle={PageStyle.buttonStyle}
                            style={PageStyle.buttonTextStyle}>
                            לחץ לבחירת מגרש
                        </Button>
                    </View>
                </React.Fragment> :
                    <Button
                        onPress={editGameHandler}
                        containerStyle={PageStyle.buttonStyle}
                        style={PageStyle.buttonTextStyle}>
                        שמור
                    </Button>
                }

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    bodyInputButton: {
        height: 42,
        textAlign: 'center',
        color: AppStyles.color.text,
    },
})

EditGameDetails.navigationOptions = (navData) => {
    return {
        headerTitle: "עריכת פרטי משחק"
    }
};

export default EditGameDetails;