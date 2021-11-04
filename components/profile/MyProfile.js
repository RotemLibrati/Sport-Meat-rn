import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button, TextInput } from 'react-native';

const MyProfile = props => {
    const profile = props.profile;
    const editField = () => {
        return <TextInput title="מגורים" />
    }
    return (
        // <View>
        //     <Text>שם משתמש: {profile.user.username}</Text>
        //     <Text>אימייל: {profile.email}</Text>
        //     <Text>עיר מגורים: {profile.city}</Text>
        //     <Text>מין: {profile.sex}</Text>
        //     <Text>גיל: {profile.age}</Text>
        // </View>
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar2.png' }} />
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
                    <TouchableOpacity style={styles.buttonContainer}>
                            <Text>{profile.city}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                            <Text>{profile.email}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                            <Text>{profile.sex}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                            <Text>{profile.age}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
};
const styles = StyleSheet.create({
    header: {
        backgroundColor: "#00CED1",
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
        color: "#00CED1"
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
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00CED1",
    },
});
export default MyProfile;
