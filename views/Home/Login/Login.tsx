import React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { observable } from "mobx";
import { userStore } from "../../../stores/user-store";
import { headerStore } from "../../../stores/header-store";
import { translationUtil } from "../../../translation/translation-util";
import { loginApi } from "../../../api/login-api";

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
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding">
          <Text>{translationUtil.translate("home.form.title")}</Text>
          <TextInput
            label={translationUtil.translate(
              "home.fields.username.placeholder"
            )}
            onChangeText={text => this.setState({ text })}
            mode="outlined"
            onChange={this.handleChange("login")}
            ref={this.createRef("usernameTextField")}
            style={styles.text}
          />
          <TextInput
            label={translationUtil.translate(
              "home.fields.password.placeholder"
            )}
            onChangeText={text => this.setState({ text })}
            mode="outlined"
            onChange={this.handleChange("password")}
            ref={this.createRef("usernameTextField")}
            style={styles.text}
          />
          <Button mode="contained" onPress={() => navigate("Login")}>
            Login
          </Button>
        </KeyboardAvoidingView>
      </View>
    );
  }

  createRef = name => target => {
    this[name] = target;
  };

  handleChange = (name: "login" | "password") => event => {
    userStore.user[name] =
      name === "login"
        ? event.target.value.toLowerCase().trim()
        : event.target.value.trim();
  };

  fireLoginOnEnterKey = event => {
    if (event.key === "Enter") {
      this.login();
    }
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
        console.log("DO SOMETHING");
      })
      .catch(() => {
        this.isLoading = false;
      });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    height: 60,
    width: "75%",
    marginBottom: 15
  }
});
