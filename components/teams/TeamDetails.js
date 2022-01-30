import React, { useEffect, useContext } from 'react';
import { FlatList, Text, View, StyleSheet, Platform, ScrollView, Alert } from 'react-native';
import uuid from 'react-native-uuid';
import { PageStyle, AppStylses, } from '../styles/AppStyles';
import Button from "react-native-button";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/HeaderButton';
import { SetToken } from '../../context/SetToken';
import API from '../../ApiService';



const TeamDetails = props => {
    const { token } = useContext(SetToken);
    const team = props.navigation.getParam("team", null);
    const teamMessgaesHandler = () => {
        props.navigation.navigate("TeamMessages", { team: team });
    }
    const teamFriendsHandler = () => {
        props.navigation.navigate("TeamFriends", { team: team });
    };
    const removeTeam = async () => {
        Alert.alert('מחקת את הקבוצה !');

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();
        formdata.append("id", team.id);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch(`${API.ipAddress}/delete-team`, requestOptions)
            .then(() => {
                props.navigation.goBack();
            })
            .catch(error => console.log('error', error));



    };
    useEffect(() => {
        props.navigation.setParams({ remove: removeTeam });
    }, []);
    return (
        <ScrollView>
            <View>
                <Text style={PageStyle.title}>קבוצת {team.name}</Text>
                <View style={{ alignItems: 'center' }}>
                    <View style={styles.boxes}>
                        <Text style={[PageStyle.TextStyle, styles.text]}>שם הקבוצה : {team.name}</Text>
                        <Text style={PageStyle.TextStyle}>מנהל הקבוצה : {team.admin.user.username}</Text>
                        <Text style={PageStyle.TextStyle}>סוג הספורט : {team.sport}</Text>
                        <Text style={PageStyle.TextStyle}>סוג הקבוצה : {team.type}</Text>

                    </View>
                </View>
                {/* <Text>חברי הקבוצה:</Text>
            {team.members.map(mem => (<Text key={uuid.v4()} >{mem.user.username}</Text>))} */}
                <View style={PageStyle.buttonStyleView}>
                    <Button
                        onPress={teamMessgaesHandler}
                        containerStyle={PageStyle.buttonStyle}
                        style={PageStyle.buttonTextStyle}>
                        הודעות הקבוצה
                    </Button>
                    <Button
                        onPress={teamFriendsHandler}
                        containerStyle={PageStyle.buttonStyle}
                        style={PageStyle.buttonTextStyle}>
                        חברי הקבוצה
                    </Button>

                </View>
            </View>
        </ScrollView>
    )
};
const styles = StyleSheet.create({
    boxes: {
        alignItems: 'center',
        backgroundColor: '#e4e6eb',
        height: "55%",
        margin: 16,
        borderRadius: 16,
        width: '80%'
    },
    text: {
        marginTop: "15%"
    }
});

TeamDetails.navigationOptions = (navData) => {
    return {
        headerTitle: 'פרטי הקבוצה',
        headerRight: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Delete" iconName="trash"
                onPress={navData.navigation.getParam('remove')}
            />
        </HeaderButtons>


    }
}

export default TeamDetails;
