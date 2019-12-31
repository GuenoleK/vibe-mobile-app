import React from "react";
import { Appbar } from "react-native-paper";
import { NavigationActions } from "react-navigation";
import { NavigationStackProp } from "react-navigation-stack";

interface ViewsHeaderProps {
  navigation: NavigationStackProp;
}

export class ViewsHeader extends React.Component<ViewsHeaderProps> {
  render() {
    return (
      <Appbar.Header>
        <Appbar.BackAction
          onPress={() =>
            this.props.navigation.dispatch(NavigationActions.back())
          }
        />
        <Appbar.Content title="Title" subtitle="Subtitle" />
        <Appbar.Action icon="dots-vertical" onPress={this._onMore} />
      </Appbar.Header>
    );
  }

  _onMore = () => console.log("Shown more");
}
