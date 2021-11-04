import React from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons, Entypo   } from '@expo/vector-icons';
import { View, Text, StyleSheet } from 'react-native';

const CustomHeaderButton = props => {
    return <HeaderButton
        {...props}
        IconComponent={Ionicons, Entypo}
        iconSize={23}
    />;
};

export default CustomHeaderButton;
