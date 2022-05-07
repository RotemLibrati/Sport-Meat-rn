import { StyleSheet, Text, View, ScrollView, TextInput, Modal, Pressable } from 'react-native';
import React, { useState } from 'react';
import { PageStyle, InputStyle, AppStyles } from '../../components/styles/AppStyles';
import Button from "react-native-button";
import API from '../../ApiService';
import axios from 'axios';
import Dialog from '../../components/message-dialog/Dialog';
import OTPInputView from '@twotalltotems/react-native-otp-input'


const ForgotPasswordScreen = props => {
    const [email, setEmail] = useState();
    const [profile, setProfile] = useState();
    const [verificationCode, setVerificationCode] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [guess, setGuess] = useState(false);
    const restorePassword = () => {
        if (!validate(email)) {
            return;
        }
        else {
            const sendPasswordToEmail = async () => {
                let formdata = new FormData();
                let generateDigits = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
                setVerificationCode(generateDigits);
                formdata.append("subject", `שחזור סיסמה`);
                formdata.append("body", `שלום \n קוד האימות הוא : ${generateDigits} `);
                formdata.append("reciver", `${email}`);
                let requestOptions = {
                    method: 'POST',
                    body: formdata,
                    redirect: 'follow'
                };

                await fetch(`${API.ipAddress}/send-email`,
                    requestOptions)
                    .then(function () {
                        setModalVisible(!modalVisible);
                    })
                    .then(function() {
                        setTimeout(() => {
                            setGuess(true);
                        }, 3500);
                    })
                    .catch(error => console.log(error));
            }

            const fetchProfile = async () => {
                var config = {
                    method: 'get',
                    url: `${API.ipAddress}/profile/${email}/`,
                };
                await axios(config)
                    .then(function (response) {
                        setProfile(response.data);
                    })
                    .then(() => {
                        sendPasswordToEmail();
                    })
                    .catch(function (error) {
                        console.log(profile);
                        alert("האימייל שהזנת לא קיים");
                    });
            };
            fetchProfile();

        }
    };
    const validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        if (reg.test(text) === false) {
            alert("אימייל לא תקין");
            return false;
        }
        return true;
    };
    return (
        <ScrollView>

            <View styles={[PageStyle.container]}>
                {!guess &&
                    <React.Fragment>
                        <Text style={PageStyle.title}>שחזור סיסמה</Text>
                        <View style={[InputStyle.inputContainerView, { marginLeft: 42 }]}>
                            <TextInput
                                style={InputStyle.bodyInput}
                                placeholderTextColor={AppStyles.color.grey}
                                placeholder="הזן אימייל"
                                onChangeText={setEmail}
                                value={email}
                                underlineColorAndroid="transparent"
                            />
                        </View>
                        <Button
                            containerStyle={[PageStyle.buttonStyle, { marginLeft: 62 }]}
                            style={PageStyle.buttonTextStyle}
                            onPress={restorePassword} >
                            שלח קוד למייל
                        </Button>
                    </React.Fragment>}
                {guess &&
                    <React.Fragment>
                        <Text style={PageStyle.title}>הזן קוד אימות</Text>
                        <View style={[InputStyle.inputContainerView, { marginLeft: 42 }]}>
                            <OTPInputView
                                style={{ width: '80%', height: 200 }}
                                pinCount={4}
                                autoFocusOnLoad
                                codeInputFieldStyle={styles.underlineStyleBase}
                                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                                onCodeFilled={((code) => {
                                    if (code === verificationCode) {
                                        props.navigation.navigate("ResetPassword", { email: email });
                                    } else {
                                        alert("הקוד שהזנת לא תקין");
                                    }
                                })}
                            />
                        </View>
                    </React.Fragment>
                }
            </View>
            {modalVisible &&
                <Dialog message={" נשלח למייל שהזנת קוד אימות, \n הזן קוד אימות זה במקום המתאים"} messageButton={"העבר"} setModalVisible={setModalVisible} modalVisible={modalVisible} />}
        </ScrollView>
    );
};
ForgotPasswordScreen.navigationOptions = () => {
    return {
        headerTitle: "שחזור סיסמה"
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        // marginLeft: 20,
        marginBottom: 150,
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
    modalView: {
        margin: 20,
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
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    underlineStyleBase: {
        width: 30,
        height: 45,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
        marginLeft: 42,
        color: 'black'
    },

    underlineStyleHighLighted: {
        borderColor: "black",
    },
});

export default ForgotPasswordScreen;