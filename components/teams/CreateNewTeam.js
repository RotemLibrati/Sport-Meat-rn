import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import Button from "react-native-button";
import API from '../../ApiService';
import { SetToken } from '../../context/SetToken';
import Data from '../../data/data'
import SelectDropdown from 'react-native-select-dropdown';
import { AppStyles, PageStyle, InputStyle, DropdownStyle } from '../styles/AppStyles';



const CreateNewTeam = props => {
    const { token, username } = useContext(SetToken);
    const [name, setName] = useState('');
    const [sport, setSport] = useState('');
    const [typeTeam, setTypeTeam] = useState('');
    let data = Data.typeSport;
    let type = ['קבוצה פרטית', 'קבוצה פומבית'];
    const createTeamHandler = () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        let formdata = new FormData();
        formdata.append("name", name);
        formdata.append("sport", sport);
        formdata.append("type", typeTeam);


        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${API.ipAddress}/create-team`,
            requestOptions)
            .then(res => res.text())
            .catch(error => console.log(error))
        props.navigation.goBack()
    }
    return (
        <ScrollView>
            <View style={PageStyle.container}>
                <Text style={PageStyle.title}>פתיחת קבוצה חדשה</Text>
                <View style={InputStyle.inputContainerView}>
                    <TextInput
                        style={InputStyle.bodyInput}
                        placeholder="שם הקבוצה"
                        onChangeText={setName}
                        value={name}
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <View style={InputStyle.inputContainerView}>
                    <SelectDropdown
                        buttonStyle={DropdownStyle.dropdownButton}
                        buttonTextStyle={DropdownStyle.dropdownTextButton}
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                        defaultButtonText="בחר סוג ספורט"
                        onSelect={(index) => {
                            setSport(index);

                        }}
                        data={data}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    />
                </View>
                <View style={InputStyle.inputContainerView}>
                    <SelectDropdown
                        buttonStyle={DropdownStyle.dropdownButton}
                        buttonTextStyle={DropdownStyle.dropdownTextButton}
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                        defaultButtonText="בחר סוג קבוצה"
                        onSelect={(index) => {
                            setTypeTeam(index);

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
            </View>
            {/* <Button title="צור קבוצה"
                onPress={createTeamHandler}
            /> */}
            <View style={PageStyle.buttonStyleView} >
                <Button
                    onPress={createTeamHandler}
                    containerStyle={PageStyle.buttonStyle}
                    style={PageStyle.buttonTextStyle}>
                    צור קבוצה
                </Button>
            </View>
        </ScrollView>
    )
};

CreateNewTeam.navigationOptions = {
    headerTitle: 'יצירת קבוצה'
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 150,
      },
})


export default CreateNewTeam;
