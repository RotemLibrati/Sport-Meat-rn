import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React from 'react';

const Dialog = props => {
    // const { setModalVisible, modalVisible } = props;
    return (
        <View style={props.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}
                onRequestClose={() => {
                    props.setModalVisible(!props.modalVisible);
                }}
            >
                <View style={props.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{props.message}</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => props.setModalVisible(!props.modalVisible)}
                        >
                            <Text style={styles.textStyle}>{props.messageButton}</Text>
                        </Pressable>
                        {props.children}
                    </View>
                </View>
            </Modal>
        </View>
    );
};



const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 50,
        marginTop: 350,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontWeight: 'bold'
    }
});
export default Dialog;