import React, { useEffect, useContext } from 'react';
import { FlatList, Text, View, StyleSheet, Platform, ScrollView, Alert } from 'react-native';
import uuid from 'react-native-uuid';
import { PageStyle, AppStyles, } from '../styles/AppStyles';
import Button from "react-native-button";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../components/HeaderButton';
import { SetToken } from '../../context/SetToken';
import API from '../../ApiService';
// import * as Linking from 'expo-linking';
import * as Linking from 'expo-linking';





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
        //Linking.openURL(`whatsapp://send?text=${Linking.getInitialURL()}&phone=+972525507563`);


    }, []);
    return (
        <ScrollView>
            <View style={PageStyle.container}>
                <Text style={PageStyle.title}>קבוצת {team.name}</Text>
                <View style={styles.boxes}>
                    <Text style={[PageStyle.TextStyle, styles.text]}>שם הקבוצה : {team.name}</Text>
                    <Text style={PageStyle.TextStyle}>מנהל הקבוצה : {team.admin.user.username}</Text>
                    <Text style={PageStyle.TextStyle}>סוג הספורט : {team.sport}</Text>
                    <Text style={PageStyle.TextStyle}>סוג הקבוצה : {team.type}</Text>
                </View>
                <View style={styles.buttonsContainer}>
                    <Button
                        containerStyle={styles.navigationContainer}
                        style={styles.navigationText}
                        onPress={teamMessgaesHandler}>
                        הודעות הקבוצה
                    </Button>
                    <Button
                        containerStyle={styles.attendanceContainer}
                        style={styles.attendanceText}
                        onPress={teamFriendsHandler}>
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
        height: 200,
        margin: 16,
        borderRadius: 16,
        width: '80%'
    },
    text: {
        marginTop: "15%"
    },
    buttonsContainer: {
        // display: 'flex',
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginRight: '20%'

    },
    navigationContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.tint,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        marginTop: 30,
    },
    navigationText: {
        color: AppStyles.color.white,
    },
    attendanceContainer: {
        width: AppStyles.buttonWidth.main,
        backgroundColor: AppStyles.color.white,
        borderRadius: AppStyles.borderRadius.main,
        padding: 10,
        borderWidth: 1,
        borderColor: AppStyles.color.tint,
        marginTop: 30,
    },
    attendanceText: {
        color: AppStyles.color.tint,
    },
});

TeamDetails.navigationOptions = (navData) => {
    return {
        headerTitle: 'פרטי הקבוצה',
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Delete" iconName="trash"
                onPress={navData.navigation.getParam('remove')}
            />
        </HeaderButtons>


    }
}

export default TeamDetails;
