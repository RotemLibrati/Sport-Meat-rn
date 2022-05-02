import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { PageStyle } from "../../components/styles/AppStyles";
import Button from "react-native-button";
import API from '../../ApiService';
const s = StyleSheet.create({
    switch: {
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 20,
    },
    container: {
        backgroundColor: "#F5F5F5",
        marginTop: 60,
    },
    label: {
        color: "black",
        fontSize: 12,
    },
    input: {
        fontSize: 16,
        color: "black",
    },
});


export default class PaymentScreen extends Component {
    state = { useLiteCreditCardInput: false };

    _onChange = (formData) => console.log(JSON.stringify(formData, null, " "));
    _onFocus = (field) => console.log("focusing", field);
    _setUseLiteCreditCardInput = (useLiteCreditCardInput) => this.setState({ useLiteCreditCardInput });



    paymentHandler = () => {
        let team = this.props.navigation.getParam('teamObject', null);
        let location = this.props.navigation.getParam('location', null);
        let date = this.props.navigation.getParam('date', null);
        let city = this.props.navigation.getParam('city', null);

        let formdata = new FormData();
        formdata.append("reciver", `${team.admin.email}`);
        formdata.append("subject", ` תשלום עבור משחק ב${location}`);
        formdata.append("body", `שלום ${team.admin.user.username}
        רכשת משחק במגרש ${location} שנמצא ב${city} בתאריך ${date}.
        הודעה זו הנה אישור תשלום שניתן להציג במקום.
        בהצלחה.`);

        let requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(`${API.ipAddress}/send-email`,
            requestOptions)
            .then(res => res.text())
            .catch(error => console.log(error));
        this.props.navigation.navigate("MainScreen");
    }
    render() {
        const { navigation } = this.props;
        return (
            <ScrollView>
                <View style={PageStyle.container}>
                    <Text style={PageStyle.title}>תשלום</Text>
                    <Text style={PageStyle.TextStyle}>עבור מגרש {navigation.getParam('location', null)} בתאריך {navigation.getParam('date', null)}</Text>
                    <Text style={PageStyle.TextStyle}>בשעה {navigation.getParam('time', null)} עבור שעתיים הסכום לתשלום:</Text>
                    <Text style={PageStyle.TextStyle}>340 ש"ח</Text>
                    <View style={s.container}>
                        {this.state.useLiteCreditCardInput ?
                            (
                                <LiteCreditCardInput
                                    autoFocus
                                    inputStyle={s.input}

                                    validColor={"black"}
                                    invalidColor={"red"}
                                    placeholderColor={"darkgray"}

                                    onFocus={this._onFocus}
                                    onChange={this._onChange} />
                            ) : (
                                <CreditCardInput
                                    autoFocus

                                    requiresName
                                    requiresCVC
                                    requiresPostalCode

                                    labelStyle={s.label}
                                    inputStyle={s.input}
                                    validColor={"black"}
                                    invalidColor={"red"}
                                    placeholderColor={"darkgray"}

                                    onFocus={this._onFocus}
                                    onChange={this._onChange} />
                            )
                        }
                    </View>
                    <Button
                        onPress={() => this.paymentHandler()}
                        containerStyle={[PageStyle.buttonStyle, { marginTop: -50 }]}
                        style={PageStyle.buttonTextStyle}>
                        סיום
                    </Button>
                </View>
            </ScrollView>
        );
    }
}

PaymentScreen.navigationOptions = () => {
    return {
        headerTitle: "תשלום משחק"
    }
}