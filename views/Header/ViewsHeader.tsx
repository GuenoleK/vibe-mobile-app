import React from 'react';
import { Appbar } from 'react-native-paper';
import { NavigationActions } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { NavigationRoute } from 'react-navigation';
import { NavigationParams } from 'react-navigation';

interface IViewsHeader {
    navigation: NavigationStackProp<NavigationRoute<NavigationParams>, any>
}

export class ViewsHeader extends React.Component<IViewsHeader> {
    render() {
        return (
            <Appbar.Header>
                <Appbar.BackAction
                    onPress={() =>this.props.navigation.dispatch(NavigationActions.back())}
                />
                <Appbar.Content
                    title="Title"
                    subtitle="Subtitle"
                />
                <Appbar.Action icon="more-vert" onPress={this._onMore} />
            </Appbar.Header>
        );
    }

    _onMore = () => console.log('Shown more');
}