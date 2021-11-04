import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Button } from 'react-native';
import ModalDropdown from "react-native-modal-dropdown";
import API from '../../ApiService';


const CreateNewTeam = props => {
    const [name, setName] = useState('');
    const [sport, setSport] = useState('');
    let data = ['כדורגל', 'כדורסל', 'טניס'];
    const createTeamHandler = () => {
        let formdata = new FormData();
        formdata.append("name", name);
        formdata.append("sport", sport);
        fetch(`${API.ipAddress}/create-team`, {
            method: 'POST',
            body: formdata
        })
            .then(res => res.json())
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
                <ModalDropdown
                    style={styles.input}
                    isFullWidth={true}
                    dropdownTextStyle={{ fontSize: 15 }}
                    defaultValue='סוג הספורט'
                    options={data}
                    placeholder="סוג הספורט"
                    onSelect={sport => sport == 0 ? setSport("כדורגל") :
                        sport == 1 ? setSport("כדורסל") :
                            setSport("טניס")}
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
