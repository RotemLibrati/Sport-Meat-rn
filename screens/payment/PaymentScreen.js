import React, { Component } from "react";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";
import { PageStyle } from "../../components/styles/AppStyles";
import Button from "react-native-button";
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
                        onPress={() => this.props.navigation.navigate("MainScreen")}
                        containerStyle={[PageStyle.buttonStyle, { marginTop: -50}]}
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
        headerTitle: "הפרופיל שלי"
    }
}