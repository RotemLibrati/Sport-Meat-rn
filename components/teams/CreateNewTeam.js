import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import ModalDropdown from "react-native-modal-dropdown";
import API from '../../ApiService';
import { SetToken } from '../../context/SetToken';
import Data from '../../data/data'
import SelectDropdown from 'react-native-select-dropdown';


const CreateNewTeam = props => {
    const { token, username } = useContext(SetToken);
    const [name, setName] = useState('');
    const [sport, setSport] = useState('');
    let data = Data.typeSport
    const createTeamHandler = () => {
        let myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        let formdata = new FormData();
        formdata.append("name", name);
        formdata.append("sport", sport);
        
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
        <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <Text>פתיחת קבוצה חדשה</Text>
                <TextInput
                    style={styles.input}
                    placeholder="שם הקבוצה"
                    onChangeText={setName}
                    value={name}
                />
                <SelectDropdown
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
            <Button title="צור קבוצה"
                onPress={createTeamHandler}
            />
        </ScrollView>
    )
};

CreateNewTeam.navigationOptions = {
    headerTitle: 'יצירת קבוצה'
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: '50%',
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    scroll: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

export default CreateNewTeam;
