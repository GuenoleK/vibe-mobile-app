import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from '../views/Home/Home';
import { ProfileScreen } from '../views/Profile/Profile';
import { HomeHeader } from '../views/Header/HomeHeader';
import { ViewsHeader } from '../views/Header/ViewsHeader';

export const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: 'Home',
        header: (<HomeHeader navigation={navigation} />)
      }),
    },
    Profile: { screen: ProfileScreen },
  },
  {
    defaultNavigationOptions: ({navigation}) => ({
      header: (<ViewsHeader navigation={navigation} />)
    })
  }
);