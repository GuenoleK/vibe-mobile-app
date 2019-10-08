import React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { userStore } from "../../../stores/user-store";
import { headerStore } from "../../../stores/header-store";
import { translationUtil } from "../../../translation/translation-util";
import { loginApi } from "../../../api/login-api";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";

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
      <View style={styles.container}>
        <KeyboardAvoidingView behavior="padding" style={styles.form}>
          <Text>{translationUtil.translate("home.form.title")}</Text>
          <TextInput
            label={translationUtil.translate(
              "home.fields.username.placeholder"
            )}
            onChangeText={this.handleChange("login")}
            mode="outlined"
            ref={this.createRef("usernameTextField")}
            style={styles.text}
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
            style={styles.text}
            textContentType="password"
            value={userStore.user.password}
            secureTextEntry
            autoCapitalize="none"
          />
          <Button mode="contained" onPress={this.login}>
            {translationUtil.translate("home.buttons.login")}
          </Button>
        </KeyboardAvoidingView>
      </View>
    );
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
          userStore.isUserConnected = isConnected
        });
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
  form: {
    flexDirection: "column",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    height: 60,
    width: "75%",
    marginBottom: 15
  }
});
