import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { ButtonGroup } from 'react-native-elements/dist/buttons/ButtonGroup';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../HeaderButton';
import { SetToken } from '../../context/SetToken';
import API from '../../ApiService';

const GameDetails = (props) => {
    const { username, token } = useContext(SetToken);
    const [selectedIndex, setSelectedIndex] = useState();
    const component1 = () => { return (<Text>מגיע</Text>) }
    const component2 = () => { return (<Text >לא מגיע</Text>) }
    const component3 = () => { return (<Text>אולי מגיע</Text>) }
    const game = props.navigation.getParam("game", null);
    const buttons = [{ element: component1 }, { element: component2 }, { element: component3 }]
    console.log(selectedIndex);
    const saveGameDeatilsHandler = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();
        formdata.append("index", selectedIndex);
        formdata.append("game", game.id);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch(`${API.ipAddress}/attendance/${username}/`, requestOptions)
            .then(function (response) {
                response.json();
            })
            .then(() => {
                props.navigation.goBack();
            })
            .catch(error => console.log('error', error));

    };

    useEffect(() => {
        if (username) {
            props.navigation.setParams({ username: username });
        }
    }, [username]);
    useEffect(() => {
        props.navigation.setParams({ save: saveGameDeatilsHandler });
    }, [selectedIndex]);
    return (
        <View>
            <ButtonGroup
                onPress={(index) => setSelectedIndex(index)}
                selectedIndex={selectedIndex}
                buttons={buttons}
                containerStyle={{ height: 50 }}
                selectedButtonStyle={selectedIndex == 0 ? styles.arraiving : selectedIndex == 1 ? styles.notArriving :
                    selectedIndex == 2 ? styles.maybeArraiving : styles.notChoose} />
            <Text>זמן המשחק: {game.event_time}</Text>
            <Text>שם המגרש: {game.location.name}</Text>
            <Text>מיקום המשחק: {game.location.region}</Text>
            <Text>קבוצה: {game.team.name}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    notArriving: {
        backgroundColor: 'red'
    },
    arraiving: {
        backgroundColor: 'green'
    },
    maybeArraiving: {
        backgroundColor: 'orange'
    },
    notChoose: {
        backgroundColor: 'white'
    }
})

GameDetails.navigationOptions = (navData) => {
    username = navData.navigation.getParam('username');
    const admin = navData.navigation.state.params.game.team.admin.user.username;
    if (username == admin) {
        return {
            headerTitle: "פרטי משחק",
            headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Edit" iconName="edit"
                    onPress={() => navData.navigation.navigate("EditProfile", {
                        profile: navData.navigation.getParam('profile'),

                    })}
                />
                <Item title="Save" iconName="save"
                    onPress={navData.navigation.getParam('save')}
                />
            </HeaderButtons>,
            
        }
    } else {
        return {
            headerTitle: "פרטי משחק",
            headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item title="Save" iconName="save"
                    onPress={() => navData.navigation.navigate("EditProfile", {
                        profile: navData.navigation.getParam('profile'),

                    })}
                />
            </HeaderButtons>,
        }

    }
};

export default GameDetails;
