import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from '../views/Home/Home';
import { ProfileScreen } from '../views/Profile/Profile';
import { HomeHeader } from '../views/Header/HomeHeader';
import { ViewsHeader } from '../views/Header/ViewsHeader';
import { LoginScreen } from '../views/Home/Login/Login';
import { headerStore } from '../stores/header-store';

export const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: ({ navigation }) => ({
        title: headerStore.headerTitle,
        header: (<HomeHeader navigation={navigation} />)
      }),
    },
    Login: { screen: LoginScreen },
    Profile: { screen: ProfileScreen },
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      header: (<ViewsHeader navigation={navigation} />)
    })
  }
);