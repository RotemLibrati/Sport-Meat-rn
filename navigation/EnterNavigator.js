import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import StartScreen from '../screens/start/StartScreen';
import RegisterScreen from '../screens/start/RegisterScreen';
import LoginScreen from '../screens/start/LoginScreen';
import ForgotPasswordScreen from '../screens/start/ForgotPasswordScreen';
import ResetPassword from '../screens/start/ResetPassword';
const EnterNavigator = createStackNavigator({
    StartScreen: StartScreen,
    RegisterScreen: RegisterScreen,
    LoginScreen: LoginScreen,
    ForgotPasswordScreen: ForgotPasswordScreen,
    ResetPassword: ResetPassword
  });

  export default createAppContainer(EnterNavigator);