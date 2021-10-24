import MainScreen from '../screens/MainScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


const EnterNavigator = createStackNavigator({
  MainScreen: MainScreen ,
  RegisterScreen: RegisterScreen ,
  LoginScreen: LoginScreen ,
  
});


export default createAppContainer(EnterNavigator);