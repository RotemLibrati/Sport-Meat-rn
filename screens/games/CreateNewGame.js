import React, { useContext, useState, useEffect } from 'react';
import { Text, View, ScrollView, StyleSheet, TextInput, Platform } from 'react-native';
import { SetToken } from '../../context/SetToken';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import SelectDropdown from 'react-native-select-dropdown';
import API from '../../ApiService';
import axios from 'axios';
import Loading from '../../components/Loading';
import { Switch } from 'react-native-elements';
import Data from '../../data/data';
import { PageStyle, AppStyles, InputStyle, DropdownStyle } from '../../components/styles/AppStyles';
import Button from "react-native-button";


const CreateNewGame = props => {
    let d = new Date();
    const { token, username } = useContext(SetToken);
    const [teams, setTeams] = useState();
    const [location, setLocation] = useState();
    const [selectedTeam, setSelectedTeam] = useState();
    const [isLoadingLoc, setIsLoadingLoc] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [city, setCity] = useState('');
    const [date, setDate] = useState(new Date().toLocaleString('he-IL', { dateStyle: "short" }));
    const [time, setTime] = useState(new Date().toLocaleString('he-IL', { timeStyle: "short" }));
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [cityDoesntExist, setCityDoesntExist] = useState(false);
    const [checked, setChecked] = useState(false);
    const [typeSport, setTypeSport] = useState();
    const [limitParticipants, setLimitParticipants] = useState(15);
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
    }
    const createGameHandler = () => {
        props.navigation.navigate("CreateNewGamePage2", {
            date: date, team: selectedTeam, time: time, type: typeSport,
            limitParticipants: limitParticipants, city: city
        });
    }
    return (
        <ScrollView>
            <View style={[PageStyle.container, { marginBottom: 80 }]}>
                <Text style={PageStyle.title}>פתיחת משחק חדש</Text>
                {Platform.OS === 'ios' ? <React.Fragment>
                    <Text style={PageStyle.TextStyle}>בחר תאריך</Text>
                    <View style={styles.buttonStyleView}>
                        <Button
                            onPress={showDatePicker}
                            containerStyle={styles.buttonStyle}
                            style={PageStyle.buttonTextStyle}>
                            {date}
                        </Button>
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                        minimumDate={new Date()}
                    />
                    <Text style={PageStyle.TextStyle}>בחר שעה</Text>
                    <View style={styles.buttonStyleView}>
                        <Button
                            onPress={showTimePicker}
                            containerStyle={styles.buttonStyle}
                            style={PageStyle.buttonTextStyle}>
                            {time}
                        </Button>
                    </View>
                    <DateTimePickerModal
                        isVisible={isTimePickerVisible}
                        mode="time"
                        onConfirm={handleConfirmForTime}
                        onCancel={hideTimePicker}
                        minuteInterval={30}
                    />
                </React.Fragment> :
                    <View>
                        <Text style={styles.TextStyle}>בחר תאריך ושעה</Text>
                        <View style={styles.buttonStyleViewForAndroid}>
                            <Button
                                onPress={showDatePicker}
                                containerStyle={styles.buttonStyle}
                                style={styles.buttonTextStyle}>
                                {date}
                            </Button>
                        </View>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="datetime"
                            onConfirm={handleConfirm}
                            onCancel={hideDatePicker}
                            minimumDate={new Date()}
                        />
                    </View>
                }
                <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }}>
                    <Text style={PageStyle.TextStyle}>האם לשייך לקבוצה ?</Text>
                    <Text>  </Text>
                    <Switch
                        value={checked}
                        onValueChange={(value) => setChecked(value)}
                    />
                </View>
                {!checked ?

                    <View style={InputStyle.inputContainerView}>
                        <SelectDropdown
                            buttonStyle={DropdownStyle.dropdownButton}
                            buttonTextStyle={styles.dropdownTextButton}
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
                    </View> :
                    (isLoading ? <Loading /> :
                        <View style={InputStyle.inputContainerView}>
                            <SelectDropdown
                                defaultButtonText="בחר קבוצה"
                                buttonStyle={DropdownStyle.dropdownButton}
                                buttonTextStyle={styles.dropdownTextButton}
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
                                disableAutoScroll={true}
                            />
                        </View>
                    )}
                <View style={InputStyle.inputContainerView}>
                    <TextInput
                        style={styles.bodyInputButton}
                        placeholder="הגבלת משתתפים"
                        onChangeText={setLimitParticipants}
                        value={limitParticipants}
                        keyboardType="numeric"
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                    /></View>
                <View style={InputStyle.inputContainerView}>
                    <TextInput
                        style={styles.bodyInputButton}
                        placeholder="בחר עיר"
                        onChangeText={setCity}
                        value={city}
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                    /></View>
            </View>

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
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    buttonStyleView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    buttonStyleViewForAndroid: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 350,
        marginBottom: 15
    },
    buttonStyle: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.tint,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 10,
    },
    dropdownTextButton: {
        fontSize: 15,
        color: AppStyles.color.grey,
        // marginLeft: 130,
        textAlign: 'right'
    },
    bodyInputButton: {
        height: 42,
        textAlign: 'center',
        color: AppStyles.color.text,
    },
    buttonTextStyle: {
        color: AppStyles.color.white,
    },
    TextStyle: {
        fontSize: 20,
        marginRight: 80,
        fontFamily: "Cochin",
        fontWeight: "bold",
        color: AppStyles.color.grey,
    },
});

CreateNewGame.navigationOptions = (navData) => {
    return {
        headerTitle: "פתיחת משחק חדש"
    }
};



export default CreateNewGame;
