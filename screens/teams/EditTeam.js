import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet, Alert } from 'react-native';
import { PageStyle, InputStyle, AppStyles, DropdownStyle } from '../../components/styles/AppStyles';
import SelectDropdown from 'react-native-select-dropdown';
import { SetToken } from '../../context/SetToken';
import data from '../../data/data';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import API from '../../ApiService';
import CustomHeaderButton from '../../components/HeaderButton';

const EditTeam = (props) => {
    const { token } = useContext(SetToken);
    const team = props.navigation.getParam("team", null);
    const [name, setName] = useState(team.name);
    const [sport, setSport] = useState(team.sport);
    const [typeTeam, setTypeTeam] = useState(team.type);
    const saveTeamDetails = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();
        formdata.append("name", name);
        formdata.append("sport", sport);
        formdata.append("type", typeTeam);


        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };
        await fetch(`${API.ipAddress}/delete-team/${team.id}/`, requestOptions)
            .then(function (response) {
                response.json();
            })
            .then(() => {
                props.navigation.popToTop();
            })
            .catch(error => console.log('error', error));
    }
    useEffect(() => {
        props.navigation.setParams({ save: saveTeamDetails });
    }, [name, sport, typeTeam]);
    return (
        <ScrollView>
            <View style={PageStyle.container}>
                <Text style={PageStyle.title}>
                    עריכת פרטי קבוצה
                </Text>
                <Text style={PageStyle.TextStyle}>שם הקבוצה</Text>
                <View style={[InputStyle.inputContainerView, styles.input]}>
                    <TextInput
                        style={InputStyle.bodyInput}
                        placeholder={name}
                        onChangeText={setName}
                        value={name}
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                    />
                </View>
                <Text style={PageStyle.TextStyle}>סוג הספורט</Text>
                <View style={[InputStyle.inputContainerView, styles.input]}>
                    <SelectDropdown
                        buttonStyle={DropdownStyle.dropdownButton}
                        buttonTextStyle={DropdownStyle.dropdownTextButton}
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                        defaultButtonText={sport}
                        onSelect={(index) => {
                            setSport(index)
                        }}
                        data={data.typeSport}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    /></View>
                <Text style={PageStyle.TextStyle}>סוג הקבוצה</Text>
                <View style={[InputStyle.inputContainerView, styles.input]}>
                    <SelectDropdown
                        buttonStyle={DropdownStyle.dropdownButton}
                        buttonTextStyle={DropdownStyle.dropdownTextButton}
                        placeholderTextColor={AppStyles.color.grey}
                        underlineColorAndroid="transparent"
                        defaultButtonText={typeTeam}
                        onSelect={(index) => {
                            setTypeTeam(index)
                        }}
                        data={data.typeTeam}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                    /></View>
            </View>
        </ScrollView>
    )
};

EditTeam.navigationOptions = (navData) => {
    return {
        headerTitle: "עריכת פרטי קבוצה",
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Save" iconName="save"
                onPress={navData.navigation.getParam('save')}
                color="black"
            />
        </HeaderButtons>,
    }
};

const styles = StyleSheet.create({
    input: {
        marginBottom: 30,
        marginTop: 10
    }
});

export default EditTeam;

