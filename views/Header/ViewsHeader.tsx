import React from 'react';
import { Appbar } from 'react-native-paper';
import { NavigationActions } from 'react-navigation';
import { INavigationProps } from '../../common/INavigationProps';

export class ViewsHeader extends React.Component<INavigationProps> {
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