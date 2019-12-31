import React from "react";
// import './empty-state.scss';
import { View, Text, ViewStyle, StyleProp } from "react-native";
import { emptyStateStyle } from "./empty-state-style";

interface IEmptyStateProps {
  icon: JSX.Element;
  title: string;
  description: string | JSX.Element;
  className?: string;
}

export class EmptyState extends React.Component<IEmptyStateProps> {
  render() {
    return (
      <View style={emptyStateStyle.container}>
        {this.props.icon}
        <Text>{this.props.title}</Text>
        <Text>{this.props.description}</Text>
      </View>
    );
  }
}
