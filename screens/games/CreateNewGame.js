import React, { useContext, useState, useEffect } from 'react';
import { Text, View, TextInput, Button } from 'react-native';
import { SetToken } from '../../context/SetToken';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectDropdown from 'react-native-select-dropdown';
import API from '../../ApiService';
import axios from 'axios';
import Loading from '../../components/Loading';


const CreateNewGame = props => {
    const { token, username } = useContext(SetToken);
    const [teams, setTeams] = useState();
    const [location, setLocation] = useState();
    const [selectedTeam, setSelectedTeam] = useState();
    const [selectedLocation, setSelectedLocation] = useState();
    const [isLoadingLoc, setIsLoadingLoc] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [datetime, setDatetime] = useState(new Date().toLocaleString('he-IL',{dateStyle:"short",timeStyle:"short"}));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const showDatePicker = () => {
        //setDatetime(datetime);
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDatetime(date.toLocaleString("he-IL", {dateStyle:"short",timeStyle:"short"}));
        hideDatePicker();
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
    },[]);
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
    },[]);
    return (
        <View>
            <Button title={datetime}
                onPress={showDatePicker}
                />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                minimumDate={new Date()}

            />
            { isLoading ? <Loading /> : 
            <SelectDropdown
                data={teams.teams.map(team => team.name)}
                onSelect={(selectedItem, index) => {
                    setSelectedTeam(teams.teams[index]);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected

                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
                defaultValue="ללא קבוצה"
            />}
            { isLoadingLoc ? <Loading /> : 
            <SelectDropdown
                data={location.locations.map(loc => loc.city)}
                onSelect={(selectedItem, index) => {
                    setSelectedLocation(location.locations[index]);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                    // text represented after item is selected
                    // if data array is an array of objects then return selectedItem.property to render after item is selected

                    return selectedItem
                }}
                rowTextForSelection={(item, index) => {
                    // text represented for each item in dropdown
                    // if data array is an array of objects then return item.property to represent item in dropdown
                    return item
                }}
            />}
            <Button title="סיום"/>

        </View>
    );

};
CreateNewGame.navigationOptions = (navData) => {
    return {
        headerTitle: "פתיחת משחק חדש"
    }
}

export default CreateNewGame;
