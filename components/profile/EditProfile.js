import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, ScrollView } from 'react-native';
import ModalDropdown from "react-native-modal-dropdown";
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import API from '../../ApiService';
import CustomHeaderButton from '../../components/HeaderButton';
import { SetToken } from '../../context/SetToken';
import { AppStyles } from '../styles/AppStyles';

const EditProfile = props => {
    const { token, username, editProfile, edit } = useContext(SetToken);
    const profile = props.navigation.getParam('profile');
    const [age, setAge] = useState('' + profile.age);
    const [email, setEmail] = useState(profile.email);
    const [sex, setSex] = useState(profile.sex);
    const [city, setCity] = useState(profile.city);


    const saveProfileHandler = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var formdata = new FormData();
        formdata.append("age", age);
        formdata.append("city", city);
        formdata.append("email", email);
        formdata.append("sex", sex);


        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: formdata,
            redirect: 'follow'
        };

        await fetch(`${API.ipAddress}/profiles/${username}/`, requestOptions)
            .then(function (response) {
                response.json();
                editProfile(edit);
            })
            //.then(await editProfile(!edit))
            .then(() => {
                props.navigation.goBack();
            })
            .catch(error => console.log('error', error));

    };
    useEffect(() => {
        props.navigation.setParams({ save: saveProfileHandler });
    }, [city, sex, email, age]);
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerContent}>
                    {profile.sex === 'זכר' ? <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar2.png' }} />
                    : <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar3.png' }} />
                }
                        <Text style={styles.name}>
                            {profile.user.username}
                        </Text>
                    </View>
                </View>


                <View style={styles.profileDetail}>
                    <View style={styles.detailContent}>
                        <Text style={styles.title}>Friends</Text>
                        <Text style={styles.count}>200</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.title}>Teams</Text>
                        <Text style={styles.count}>200</Text>
                    </View>
                    <View style={styles.detailContent}>
                        <Text style={styles.title}>Following</Text>
                        <Text style={styles.count}>200</Text>
                    </View>
                </View>

                <View style={styles.body}>
                    <View style={styles.bodyContent}>
                        <TextInput
                            style={styles.buttonContainer}
                            value={city}
                            onChangeText={setCity} />
                        <TextInput
                            style={styles.buttonContainer}
                            value={email}
                            onChangeText={setEmail} />
                        <ModalDropdown
                            style={styles.buttonContainer}
                            isFullWidth={false}
                            dropdownTextStyle={{ fontSize: 15 }}
                            defaultValue={'' + sex}
                            options={['זכר', 'נקבה']}
                            placeholder="מין"
                            onSelect={sex => sex == 0 ? setSex("זכר") : setSex("נקבה")} />
                        <TextInput
                            style={styles.buttonContainer}
                            value={age}
                            keyboardType="numeric"
                            onChangeText={setAge} />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};
EditProfile.navigationOptions = (navData) => {
    return {
        headerTitle: 'עריכת פרופיל',
        headerStyle: {
            backgroundColor: AppStyles.color.tint
        },
        tabBarOptions: {
            activeTintColor: 'white'
        },
        headerRight: () => <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
            <Item title="Save" iconName="save"
                onPress={navData.navigation.getParam('save')}
            color="black"
            />
        </HeaderButtons>,
        
    }
}
const styles = StyleSheet.create({
    header: {
        backgroundColor: AppStyles.color.tint,
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "#FFFFFF",
        fontWeight: '600',
    },
    profileDetail: {
        alignSelf: 'center',
        marginTop: 200,
        alignItems: 'center',
        flexDirection: 'row',
        position: 'absolute',
        backgroundColor: "#ffffff"
    },
    detailContent: {
        margin: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        color: AppStyles.color.tint
    },
    count: {
        fontSize: 18,
    },
    bodyContent: {
        flex: 1,
        alignItems: 'center',
        padding: 30,
        marginTop: 40
    },
    textInfo: {
        fontSize: 18,
        marginTop: 20,
        color: "#696969",
    },
    buttonContainer: {
        marginTop: 10,
        padding: 10,
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: AppStyles.color.tint,
        height: 40,

        // margin: 12,
        // borderWidth: 1,
        // padding: 10,
    },
});

export default EditProfile;
