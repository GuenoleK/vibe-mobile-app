import React from 'react';
import { Appbar } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { userStore } from '../../stores/user-store';
import { observer } from 'mobx-react';
import { INavigationProps } from '../../common/INavigationProps';

@observer
export class HomeHeader extends React.Component<INavigationProps> {
    render() {
        return (
            <Appbar.Header>
                <Appbar.Content
                    title="Vibe"
                />
                <Appbar.Action icon="search" onPress={this._onSearch} />
                {userStore.isUserConnected && <Appbar.Action icon="fingerprint" onPress={this.disconnect} />}
            </Appbar.Header>
        );
    }

    async disconnect() {
        AsyncStorage.clear().then(() => {
            userStore.clearUser();
            userStore.isConnected().then(isConnected => {
                userStore.isUserConnected = isConnected
                console.log(isConnected);
            })
        })
    }

    _onSearch = () => console.log('Searching');

    _onMore = () => console.log('Shown more');
}