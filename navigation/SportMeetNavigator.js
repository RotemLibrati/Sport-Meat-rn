import React from 'react';
import { Text } from 'react-native';
import StartScreen from '../screens/start/StartScreen';
import RegisterScreen from '../screens/start/RegisterScreen';
import LoginScreen from '../screens/start/LoginScreen';
import MainScreen from '../screens/MainScreen';
import GamesScreen from '../screens/games/GamesScreen';
import GameDetails from '../components/games/GameDetails';
import TeamDetails from '../components/teams/TeamDetails';
import TeamsScreen from '../screens/teams/TeamsScreen';
import CreateNewTeam from '../components/teams/CreateNewTeam';
import MyProfileScreen from '../screens/profile/MyProfileScreen';
import EditProfile from '../components/profile/EditProfile';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';




const EnterNavigator = createStackNavigator({
  StartScreen: StartScreen,
  RegisterScreen: RegisterScreen,
  LoginScreen: LoginScreen,

});

const MainScreenNavigator = createStackNavigator({
  MainScreen: MainScreen,
  GamesScreen: GamesScreen,
  GameDetails: GameDetails,
  TeamsScreen: TeamsScreen,
  TeamDetails: TeamDetails,
  CreateNewTeam: CreateNewTeam

});

const TeamScreen = createStackNavigator({
  TeamScreen: TeamsScreen,
});

const ProfileScreenNavigator = createStackNavigator({
  MyProfileScreen: MyProfileScreen,
  EditProfile: EditProfile
});


const SportMeetTabNavigator = createBottomTabNavigator({
  Start: {
    screen: EnterNavigator,
  },
  Main: {
    screen: MainScreenNavigator
  },
  Profile: {
    screen: ProfileScreenNavigator, navigationOptions: {
      tabBarIcon: (tabInfo) => {
        return (<AntDesign name="profile" size={24} color='blue' />);
      },

      tabBarLabel: <Text>פרופיל</Text>
    },

  },

});

const MainNavigation = createDrawerNavigator({
  SportMeet: {
    screen: SportMeetTabNavigator
  },
  Main: {
    screen: MainScreenNavigator, navigationOptions: {
      drawerLabel: 'ראשי',
      drawerIcon: <Ionicons name="ios-home-outline" size={24} color="black" />
    }
  },
  Profile: {
    screen: ProfileScreenNavigator, navigationOptions: {
      drawerLabel: 'פרופיל',
      drawerIcon: <AntDesign name="profile" size={24} color="black" />
    }
  },
  Enter: {
    screen: EnterNavigator, navigationOptions: {
      drawerLabel: 'כניסה',
      drawerIcon: <Ionicons name="enter-outline" size={24} color="black" />
    }
  },
  TeamScreen: {
    screen: TeamScreen, navigationOptions: {
      drawerLabel: 'הקבוצות שלי',
      drawerIcon: <FontAwesome name="group" size={24} color="black" />
    }
    
  }
},
  {
    contentOptions: {
      activeTintColor: 'orange',
    }
  }

);

export default createAppContainer(MainNavigation);