import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Notification = props => {
    return <View style={[styles.NotificationContainer, !props.notification.is_seen && {backgroundColor: '#b0c4de'}]}>
            <Text style={styles.message}>
                {props.notification.message}
            </Text>
            <Text style={styles.date}>{props.notification.timestamp}</Text>
        </View>
};

const styles = StyleSheet.create({
    NotificationContainer: {
        height: 80,
        width: '100%',
        textAlign: 'right',
        borderColor: 'black',
        borderRadius: 2,
        backgroundColor: 'white',
        marginTop: 3,
        
    },
    message: {
        textAlign: 'right',
        fontSize: 20,
    },
    date: {
        textAlign: 'right',
        fontSize: 12
    }, 
    // is_seen: {
    //     backgroundColor: 'black '
    // }
});
export default Notification;