import React from "react";
import { createAppContainer } from "react-navigation";
import { MainNavigator } from "./navigation/navigation";
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper";
import { initializeTranslation } from "./translation/translation-initializer";
import { userStore } from "./stores/user-store";
import { observer } from "mobx-react";
import { toJS } from "mobx";

initializeTranslation("en");

const App = createAppContainer(MainNavigator);

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: "#3f51b5"
  }
};

@observer
class Layout extends React.Component {
  async componentDidMount() {
    await userStore.initUserStore();
  }

  render() {
    return (
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    );
  }
}

export default Layout;
