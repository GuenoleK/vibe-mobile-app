import React from 'react';
import { Appbar, Avatar } from 'react-native-paper';
import { AsyncStorage } from 'react-native';
import { userStore } from '../../stores/user-store';
import { observer } from 'mobx-react';
import { INavigationProps } from '../../common/INavigationProps';
import { themeStore } from '../../stores/theme-store';
import { StorageKeysEnum } from '../../enums/StorageKeysEnum';

@observer
export class HomeHeader extends React.Component<INavigationProps> {
    render() {
        return (
            <Appbar.Header>
                <Appbar.Content
                    title="Vibe"
                />
                {userStore.isUserConnected && <Appbar.Action icon="search" onPress={this._onSearch} />}
                {userStore.isUserConnected && <Appbar.Action icon="power-settings-new" onPress={this.disconnect} />}
                <Appbar.Action icon={this.switchThemeIcon} onPress={this.switchTheme} />
            </Appbar.Header>
        );
    }

    get switchThemeIcon() {
        return themeStore.isDark ? "wb-sunny" : "brightness-3"
    }

    async switchTheme() {
        themeStore.isDark = !themeStore.isDark;
        await AsyncStorage.setItem(StorageKeysEnum.IS_THEME_DARK, String(themeStore.isDark));
    }

    async disconnect() {
        AsyncStorage.clear().then(() => {
            userStore.clearUser();
            userStore.isConnected().then(isConnected => {
                userStore.isUserConnected = isConnected
            })
        })
    }

    _onSearch = () => console.log('Searching');

    _onMore = () => console.log('Shown more');
}