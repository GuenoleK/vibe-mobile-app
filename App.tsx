import React from "react";
import { createAppContainer } from "react-navigation";
import { MainNavigator } from "./navigation/navigation";
import {
  Provider as PaperProvider,
  DefaultTheme,
  DarkTheme
} from "react-native-paper";
import { initializeTranslation } from "./translation/translation-initializer";
import { userStore } from "./stores/user-store";
import { observer } from "mobx-react";
import { themeStore } from "./stores/theme-store";
import { AsyncStorage } from "react-native";
import { StorageKeysEnum } from "./enums/StorageKeysEnum";
import { observable, computed, toJS } from "mobx";
import { loginApi } from "./api/login-api";
import { BackgroundColorEnum } from "./enums/BackgroundColorEnum";

initializeTranslation("en");

const App = createAppContainer(MainNavigator);

const lightTheme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3f51b5"
  }
};

const darkTheme = {
  ...DarkTheme,
  roundness: 4,
  isDark: true,
  colors: {
    ...DarkTheme.colors,
    primary: "#3f51b5",
    text: "#fff",
    background: BackgroundColorEnum.DARK_GREY
  }
};

@observer
class Layout extends React.Component {
  @observable
  canRenderChildren = false;

  async componentDidMount() {
    // User managmement
    userStore.user = await loginApi.initUserStore();

    // Theme management
    if (
      (await AsyncStorage.getItem(StorageKeysEnum.IS_THEME_DARK)) === "true" ||
      themeStore.isDark
    ) {
      themeStore.isDark = true;
    } else {
      themeStore.isDark = false;
    }

    this.canRenderChildren = true;
  }

  render() {
    return (
      <PaperProvider theme={this.theme}>
        {this.canRenderChildren && <App />}
      </PaperProvider>
    );
  }

  @computed
  get theme() {
    return themeStore.isDark ? darkTheme : lightTheme;
  }
}

export default Layout;
