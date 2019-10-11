import React from "react";
// import "./card-container.scss";
import { VibeCard } from "../card/vibe-card";
import { observer } from "mobx-react";
import { computed } from "mobx";
import { articleStore } from "../../../stores/article-store";
import { View } from "react-native";

@observer
export class CardContainer extends React.Component {
  render() {
    // return <div data-component="card-container">{this.ArticleList}</div>;
    return <View>{this.ArticleList}</View>;
  }

  @computed
  get ArticleList() {
    return (
      <View>
        {articleStore.searchableArticleList.map((article, idx) => (
          <VibeCard article={article} key={`article-list-card-${idx}`} />
        ))}
      </View>
    );
  }
}
