import React, { useContext, useState, useEffect } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { SetToken } from '../../context/SetToken';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectDropdown from 'react-native-select-dropdown';
import API from '../../ApiService';
import axios from 'axios';
import Loading from '../../components/Loading';
import { Switch } from 'react-native-elements';
import Data from '../../data/data';


const CreateNewGame = props => {
    let d = new Date();
    const { token, username } = useContext(SetToken);
    const [teams, setTeams] = useState();
    const [location, setLocation] = useState();
    const [selectedTeam, setSelectedTeam] = useState();
    const [selectedLocation, setSelectedLocation] = useState();
    const [isLoadingLoc, setIsLoadingLoc] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [date, setDate] = useState(new Date().toLocaleString('he-IL', { dateStyle: "short" }));
    const [time, setTime] = useState(new Date().toLocaleString('he-IL', { timeStyle: "short" }));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [checked, setChecked] = useState(false);
    const [typeSport, setTypeSport] = useState('');
    const type = Data.typeSport;
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };
    const handleConfirm = (date) => {
        setDate(date.toLocaleString("he-IL", { dateStyle: "short" }));
        hideDatePicker();
    };
    const handleConfirmForTime = (time) => {
        setTime(time.toLocaleString("he-IL", { timeStyle: "short" }));
        hideTimePicker();
    };
    console.log()
    useEffect(() => {
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
    useEffect(() => {
        const fetchTeams = async () => {
            let config = {
                method: 'get',
                url: `${API.ipAddress}/locations`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };
            await axios(config)
                .then(function (response) {
                    setLocation(response.data);
                    setIsLoadingLoc(false);
                })
                .catch(function (error) {
                    console.log(error);
                });
        };
        fetchTeams();
    }, []);
    const createGameHandler = () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        //myHeaders.append("Content-Type", "application/json");
        let formdata = new FormData();
        formdata.append("team", selectedTeam);
        formdata.append("location", selectedLocation);
        formdata.append("date", date);
        formdata.append("time", time);
        formdata.append("type", typeSport);

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${API.ipAddress}/create-game`,
            requestOptions)
            .then(res => res.text())
            .catch(error => console.log(error))
        props.navigation.goBack()
    }
    return (
        <View>

            <Text style={{ alignContent: 'center' }}>בחר תאריך</Text>
            <Button title={date}
                onPress={showDatePicker}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                minimumDate={new Date()}
            />
            <Button title={time}
                onPress={showTimePicker}
            />
            <DateTimePickerModal
                isVisible={isTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmForTime}
                onCancel={hideTimePicker}
                minuteInterval={30}
            />
            <Switch
                value={checked}
                onValueChange={(value) => setChecked(value)}
            />
            {!checked ?
                <View>
                    <Text>ללא קבוצה</Text>
                    <SelectDropdown
                        defaultButtonText="בחר סוג ספורט"
                        onSelect={(index) => {
                            setTypeSport(index);
                            
                        }}
                        data={type}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </View>
                :
                (isLoading ? <Loading /> :
                    <SelectDropdown
                        defaultButtonText="בחר קבוצה"
                        data={teams.teams.map(team => team.name)}
                        onSelect={(selectedItem, index) => {
                            setSelectedTeam(teams.teams[index].id);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />)}
            {isLoadingLoc ? <Loading /> :
                <SelectDropdown
                    defaultButtonText="מיקום"
                    data={location.locations.map(loc => loc.name)}
                    onSelect={(selectedItem, index) => {
                        setSelectedLocation(location.locations[index].id);
                    }}
                    buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem
                    }}
                    rowTextForSelection={(item, index) => {
                        return item
                    }}
                />}
            <Button title="סיום"
                onPress={createGameHandler} />

        </View>
    );

};
CreateNewGame.navigationOptions = (navData) => {
    return {
        headerTitle: "פתיחת משחק חדש"
    }
}

export default CreateNewGame;
