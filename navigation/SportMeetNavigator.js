import StartScreen from '../screens/StartScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainScreen from '../screens/MainScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';



const EnterNavigator = createStackNavigator({
  StartScreen: StartScreen ,
  RegisterScreen: RegisterScreen ,
  LoginScreen: LoginScreen ,
  
});

const SportMeetTabNavigator = createBottomTabNavigator({
  Start: {
    screen: EnterNavigator
  },
  Main: {
    screen: MainScreen
  }
});

const MainNavigation = createDrawerNavigator({
  Main: {
    screen: SportMeetTabNavigator
  }
});

export default createAppContainer(MainNavigation);