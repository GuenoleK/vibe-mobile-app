import React from 'react';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import { userStore } from '../../stores/user-store';
import { View, StyleSheet } from 'react-native';
import { ArticleListScreen } from '../Article/ArticleList/ArticleList';
import { LoginScreen } from './Login/Login';
import { INavigationProps } from '../../common/INavigationProps';

@observer
export class HomeScreen extends React.Component<INavigationProps> {
    render() {
        return(
            <View style={styles.container}>
                {userStore.isUserConnected ?
                    <ArticleListScreen navigation={this.props.navigation} />
                    : <LoginScreen navigation={this.props.navigation} />
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    width: '100%'
  }
});