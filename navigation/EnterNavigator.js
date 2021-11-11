import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import StartScreen from '../screens/start/StartScreen';
import RegisterScreen from '../screens/start/RegisterScreen';
import LoginScreen from '../screens/start/LoginScreen';

const EnterNavigator = createStackNavigator({
    StartScreen: StartScreen,
    RegisterScreen: RegisterScreen,
    LoginScreen: LoginScreen,
  });

  export default createAppContainer(EnterNavigator);