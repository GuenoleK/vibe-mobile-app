import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { HomeScreen } from '../views/Home/Home';
import { ProfileScreen } from '../views/Profile/Profile';

export const MainNavigator = createStackNavigator({
  Home: {screen: HomeScreen},
  Profile: {screen: ProfileScreen},
});