import React, { useContext } from 'react';
import { Text } from 'react-native';
import CreateNewGame from '../screens/games/CreateNewGame';
import MainScreen from '../screens/MainScreen';
import GamesScreen from '../screens/games/GamesScreen';
import GameDetails from '../components/games/GameDetails';
import TeamDetails from '../components/teams/TeamDetails';
import TeamsScreen from '../screens/teams/TeamsScreen';
import CreateNewTeam from '../components/teams/CreateNewTeam';
import MyProfileScreen from '../screens/profile/MyProfileScreen';
import EditProfile from '../components/profile/EditProfile';
import TeamMessages from '../components/messages/TeamMessages';
import TeamFriends from '../components/teams/TeamFriends';
import DetailsMessage from '../components/messages/DetailsMessage';
import FriendsProfileScreen from '../screens/profile/FriendsProfileScreen';
import PublicGamesScreen from '../screens/games/PublicGamesScreen';
import CreateMessage from '../components/messages/CreateMessage';
import AttendancesPlayers from '../screens/games/AttendancesPlayers';
import NotificationScreen from '../screens/notifications/NotificationScreen';
import { FontAwesome5, MaterialCommunityIcons, AntDesign, Ionicons, FontAwesome  } from '@expo/vector-icons'; 
import { AppStyles } from '../components/styles/AppStyles';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { SetToken } from '../context/SetToken';

// const SportMeetNavigator = () => {
//   const { token } = useContext(SetToken);
//   console.log("Token");
//   return;
// };


// const EnterNavigator = createStackNavigator({
//   StartScreen: StartScreen,
//   RegisterScreen: RegisterScreen,
//   LoginScreen: LoginScreen,
// });
const TeamScreen = createStackNavigator({
  TeamScreen: TeamsScreen,
  TeamDetails: TeamDetails,
  CreateNewTeam: CreateNewTeam,
  TeamMessages: TeamMessages,
  CreateMessage: CreateMessage,
  TeamFriends: TeamFriends,
  DetailsMessage: DetailsMessage,
  FriendsProfileScreen: FriendsProfileScreen

});

const MainScreenNavigator = createStackNavigator({
  MainScreen: MainScreen,
  GamesScreen: GamesScreen,
  GameDetails: GameDetails,
  TeamsScreen: TeamsScreen,
  TeamDetails: TeamDetails,
  TeamMessages: TeamMessages,
  CreateMessage: CreateMessage,
  AttendancesPlayers: AttendancesPlayers,
  TeamFriends: TeamFriends,
  FriendsProfileScreen: FriendsProfileScreen,
  DetailsMessage: DetailsMessage,
  CreateNewTeam: CreateNewTeam,
  CreateNewGame: CreateNewGame,
  PublicGamesScreen: PublicGamesScreen

});

const NotificationNavigator = createStackNavigator({
  NotificationScreen: NotificationScreen,
});



const ProfileScreenNavigator = createStackNavigator({
  MyProfileScreen: MyProfileScreen,
  EditProfile: EditProfile
});


const SportMeetTabNavigator = createBottomTabNavigator({
  Main: {
    screen: MainScreenNavigator, navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return (<MaterialCommunityIcons name="home-outline" size={30}  color={focused ? AppStyles.color.tint : 'black'} />);
      },
      tabBarLabel: <Text>ראשי</Text>,
    },
  },
  Notification: {
    screen: NotificationNavigator, navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return (<Ionicons name="notifications-circle-outline" size={30} color={focused ? AppStyles.color.tint : 'black'} />);
      },
      tabBarLabel: <Text>התראות</Text>
    },
  },
  Profile: {
    screen: ProfileScreenNavigator, navigationOptions: {
      tabBarIcon: ({ focused }) => {
        return (<FontAwesome5 name="user-circle" size={24}  color={focused ? AppStyles.color.tint : 'black'} />);
      },
      tabBarLabel: <Text>פרופיל</Text>,

    },



  },
  // tabBarOptions: {
  //   labelPosition: 'below-icon',
  //   activeTintColor: '#E8AA65',
  //   inactiveTintColor: '#58585A',
  //   fontSize: 50,
  //   style: {
  //     height: 50,
  //     backgroundColor: '#3B3B3B',
  //   }
  // },


});

const MainNavigation = createDrawerNavigator({
  // ...(token = useContext(SetToken)),
  // Enter: {
  //   screen: EnterNavigator, navigationOptions: {
  //     // drawerLabel: token ? 'התנתקות' : 'כניסה',
  //     // drawerLabel: 'כניסה',
  //     // drawerIcon: <Ionicons name="enter-outline" size={24} color="black" />
  //   }
  // },
  SportMeet: {
    screen: SportMeetTabNavigator
  },
  Main: {
    screen: MainScreenNavigator, navigationOptions: {
      drawerLabel: 'ראשי',
      drawerIcon: <MaterialCommunityIcons name="home-outline" size={30} />
    }
  },
  Profile: {
    screen: ProfileScreenNavigator, navigationOptions: {
      drawerLabel: 'פרופיל',
      drawerIcon: <AntDesign name="profile" size={24} color="black" />
    }
  },

  TeamScreen: {
    screen: TeamScreen, navigationOptions: {
      drawerLabel: 'הקבוצות שלי',
      drawerIcon: <FontAwesome name="group" size={24} color="black" />,
    }

  }
},
  {
    contentOptions: {
      activeTintColor: AppStyles.color.tint,
    }
  }

);

export default createAppContainer(MainNavigation);