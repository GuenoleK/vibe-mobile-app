import React from 'react';
import { Appbar } from 'react-native-paper';
import { NavigationRoute, NavigationParams } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';

interface IHomeHeaderProps {
    navigation: NavigationStackProp<NavigationRoute<NavigationParams>, any>
}

export class HomeHeader extends React.Component<IHomeHeaderProps> {
    render() {
        return (
            <Appbar.Header>
                <Appbar.Content
                    title="Vibe"
                />
                <Appbar.Action icon="search" onPress={this._onSearch} />
                <Appbar.Action icon="more-vert" onPress={this._onMore} />
            </Appbar.Header>
        );
    }

    _onSearch = () => console.log('Searching');

    _onMore = () => console.log('Shown more');
}