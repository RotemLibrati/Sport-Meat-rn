import React from 'react';
import { View } from 'react-native';
import AllTeams from '../../components/teams/AllTeams';
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import CustomHeaderButton from '../../components/HeaderButton';

const TeamsScreen = props => {
    return (
        <View>
            <AllTeams navigation={props.navigation}/>
        </View>
    )
};

TeamsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: "הקבוצות שלי",
        headerLeft: <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item
        title="Menu"
        iconName="menu"
        onPress={() => { navData.navigation.toggleDrawer() }} />
    </HeaderButtons>
    }
  };
export default TeamsScreen;
