import React from "react";
import { createStackNavigator } from "react-navigation-stack";
import { ProfileScreen } from "../views/Profile/Profile";
import { Header } from "../views/Header/Header";
import { ViewsHeader } from "../views/Header/ViewsHeader";
import { LoginScreen } from "../views/Home/Login/Login";
import { headerStore } from "../stores/header-store";
import { HomeScreen } from "../views/Home/Home";
import { ArticleDetail } from "../views/Article/ArticleDetail/ArticleDetail";

export const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: headerStore.headerTitle,
        header: props => <Header {...props} />
      }
    },
    Login: { screen: LoginScreen },
    ArticleDetail: { screen: ArticleDetail },
    Profile: { screen: ProfileScreen }
  },
  {
    defaultNavigationOptions: {
      header: props => <ViewsHeader {...props} />
    }
  }
);
