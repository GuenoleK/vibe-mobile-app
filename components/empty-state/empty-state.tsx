import React from "react";
// import './empty-state.scss';
import { View, Text } from "react-native";

interface IEmptyStateProps {
  icon: JSX.Element;
  title: string;
  description: string | JSX.Element;
  className?: string;
}

export class EmptyState extends React.Component<IEmptyStateProps> {
  render() {
    return (
      <View>
        {this.props.icon}
        <Text>{this.props.title}</Text>
        <Text>{this.props.description}</Text>
      </View>
      //   <div data-component="empty-state" className={this.props.className ? this.props.className : ''}>
      //     {this.props.icon}
      //     <div className="title">{this.props.title}</div>
      //     <div className="description">{this.props.description}</div>
      //   </div>
    );
  }
}
