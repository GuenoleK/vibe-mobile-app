import React from "react";
import { observable } from "mobx";
import { observer } from "mobx-react";
import { userStore } from "../../stores/user-store";
import { View, StyleSheet } from "react-native";
import { ArticleListScreen } from "../Article/ArticleList/ArticleList";
import { LoginScreen } from "./Login/Login";
import { themeStore } from "../../stores/theme-store";
import { DarkTheme, DefaultTheme } from "react-native-paper";
import { NavigationStackProp } from "react-navigation-stack";

interface HomeScreenProps {
  navigation: NavigationStackProp;
}

@observer
export class HomeScreen extends React.Component<HomeScreenProps> {
  render() {
    return (
      <View style={this.styles.container}>
        {userStore.isUserConnected ? (
          <ArticleListScreen navigation={this.props.navigation} />
        ) : (
          <LoginScreen navigation={this.props.navigation} />
        )}
      </View>
    );
  }

  get styles() {
    return StyleSheet.create({
      container: {
        flex: 1,
        width: "100%",
        backgroundColor: "transparent",
        color: themeStore.isDark
          ? DarkTheme.colors.text
          : DefaultTheme.colors.text
      }
    });
  }
}
