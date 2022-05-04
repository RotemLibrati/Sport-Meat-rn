import React from "react";
import { View, Text, StyleSheet } from 'react-native';
import { PageStyle, AppStyles } from "../../components/styles/AppStyles";

const TermsScreen = () => {
    return (
        <View style={[PageStyle.container, { marginTop: 70 }]}>
            <Text style={[PageStyle.title, {marginBottom: 40}]}>תקנון</Text>
            <Text style={styles.textStyle}>ברוכים הבאים לאפליקציית Sport Meet</Text>
            <Text style={styles.textStyle}>1. השימוש באפליקציה מותר לכל גיל.</Text>
            <Text style={styles.textStyle}>2. הנוסח כתוב בלשון זכר אך מתייחס לשני המינים.</Text>
            <Text style={styles.textStyle}>3. חובה לשמור על שפה נאותה - אין לקלל.</Text>
            
        </View>
    );
};
TermsScreen.navigationOptions = () => {
    return {
        headerTitle: "תקנון",
    }
};

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        fontFamily: "Cochin",
        fontWeight: "bold",
        color: AppStyles.color.grey,
        alignItems: "flex-start",
        marginBottom: 10
    }
});

export default TermsScreen;