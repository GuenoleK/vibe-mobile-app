import { observer } from "mobx-react";
import React from "react";
import { View } from "react-native";
import { articleStore } from "../../../stores/article-store";
import { VibeCard } from "../card/VibeCard";
import { NavigationStackProp } from "react-navigation-stack";

interface ICardContainerProps {
  navigation: NavigationStackProp;
}

@observer
export class CardContainer extends React.Component<ICardContainerProps> {
  render() {
    return (
      <View>
        <View>
          {articleStore.searchableArticleList.map((article, idx) => (
            <VibeCard
              article={article}
              key={`article-list-card-${idx}`}
              navigation={this.props.navigation}
            />
          ))}
        </View>
      </View>
    );
  }
}
