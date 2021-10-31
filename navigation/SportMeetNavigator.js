import StartScreen from '../screens/start/StartScreen';
import RegisterScreen from '../screens/start/RegisterScreen';
import LoginScreen from '../screens/start/LoginScreen';
import MainScreen from '../screens/MainScreen';
import GamesScreen from '../screens/games/GamesScreen';
import GameDetails from '../components/games/GameDetails';
import TeamDetails from '../components/teams/TeamDetails';
import TeamsScreen from '../screens/teams/TeamsScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';



const EnterNavigator = createStackNavigator({
  StartScreen: StartScreen ,
  RegisterScreen: RegisterScreen ,
  LoginScreen: LoginScreen ,
  
});

const MainScreenNavigator = createStackNavigator({
  MainScreen: MainScreen,
  GamesScreen: GamesScreen,
  GameDetails: GameDetails,
  TeamsScreen: TeamsScreen,
  TeamDetails: TeamDetails,

});


const SportMeetTabNavigator = createBottomTabNavigator({
  Start: {
    screen: EnterNavigator
  },
  Main: {
    screen: MainScreenNavigator
  }
});

const MainNavigation = createDrawerNavigator({
  Main: {
    screen: SportMeetTabNavigator
  }
});

export default createAppContainer(MainNavigation);