import React from 'react';
import { createAppContainer } from 'react-navigation';
import { MainNavigator } from './navigation/navigation';
import { Provider as PaperProvider, Appbar, DefaultTheme } from 'react-native-paper';

const App = createAppContainer(MainNavigator);

const theme = {
  ...DefaultTheme,
  roundness: 4,
  colors: {
    ...DefaultTheme.colors,
    primary: '#3f51b5'
  }
};

class Layout extends React.Component {
  render() {
    return (
      <PaperProvider theme={theme}>
        <App />
      </PaperProvider>
    )
  }
};

export default Layout;
