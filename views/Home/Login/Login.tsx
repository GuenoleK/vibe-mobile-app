import React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Button, TextInput, DarkTheme, DefaultTheme } from "react-native-paper";
import { userStore } from "../../../stores/user-store";
import { headerStore } from "../../../stores/header-store";
import { translationUtil } from "../../../translation/translation-util";
import { loginApi } from "../../../api/login-api";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";
import { loginStyle } from "./login-style";
import { themeStore } from "../../../stores/theme-store";

@observer
export class LoginScreen extends React.Component<{ navigation: any }> {
  @observable
  isLoading = false;

  @observable
  usernameTextField;

  @observable
  passwordTextfield;

  // Component life cycle
  componentWillMount() {
    userStore.clearUser();
    headerStore.headerTitle = "Vibe";
  }

  componentWillUnmount() {
    headerStore.headerTitle = "";
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={loginStyle.container}>
        <KeyboardAvoidingView behavior="padding" style={loginStyle.form}>
          <Text style={this.titleStyle.title}>
            {translationUtil.translate("home.form.title")}
          </Text>
          <TextInput
            label={translationUtil.translate(
              "home.fields.username.placeholder"
            )}
            onChangeText={this.handleChange("login")}
            mode="outlined"
            ref={this.createRef("usernameTextField")}
            style={loginStyle.text}
            value={userStore.user.login}
            onSubmitEditing={() => this.selectInput("passwordTextField")}
            blurOnSubmit={false}
            autoCapitalize="none"
            returnKeyType="next"
            textContentType="username"
          />
          <TextInput
            label={translationUtil.translate(
              "home.fields.password.placeholder"
            )}
            onChangeText={this.handleChange("password")}
            mode="outlined"
            ref={this.createRef("passwordTextField")}
            style={loginStyle.text}
            textContentType="password"
            value={userStore.user.password}
            secureTextEntry
            autoCapitalize="none"
          />
          <View style={loginStyle.buttons}>
            <Button
              style={loginStyle.loginRegisterButton}
              mode="contained"
              onPress={this.login}
            >
              {translationUtil.translate("home.buttons.login")}
            </Button>
            <Button
              style={loginStyle.loginRegisterButton}
              mode="text"
              onPress={() => console.log("Hello")}
            >
              {translationUtil.translate("home.buttons.register")}
            </Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }

  get titleStyle() {
    return StyleSheet.create({
      title: {
        fontSize: 32,
        marginBottom: 32,
        fontWeight: "bold",
        width: "100%",
        textAlign: "center",
        color: themeStore.isDark
          ? DarkTheme.colors.text
          : DefaultTheme.colors.text
      }
    });
  }

  createRef = name => target => {
    this[name] = target;
  };

  selectInput(name: string) {
    this[name].focus();
  }

  handleChange = (name: "login" | "password") => value => {
    userStore.user[name] =
      name === "login" ? value.toLowerCase().trim() : value.trim();
  };

  /**
   * Call the auth + login function
   * When everything is ok, we redirect the user to the article list
   */
  login = () => {
    this.isLoading = true;
    loginApi
      .authenticate()
      .then(() => {
        // window.location.reload();
        userStore.isConnected().then(isConnected => {
          userStore.isUserConnected = isConnected;
        });
      })
      .catch(() => {
        this.isLoading = false;
      });
  };
}
