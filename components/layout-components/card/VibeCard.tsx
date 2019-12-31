import React from "react";
import { computed } from "mobx";
import { Card, Button, Avatar, Divider } from "react-native-paper";
import { vibeCardStyle } from "./vibe-card-style";
import { translationUtil } from "../../../translation/translation-util";
import { NavigationStackProp } from "react-navigation-stack";
import { observer } from "mobx-react";
import { View } from "react-native";
import { IArticle } from "../../../model/article.model";

interface IVibeCardProps {
  article: IArticle;
  navigation: NavigationStackProp;
}

@observer
export class VibeCard extends React.Component<IVibeCardProps> {
  render() {
    return (
      <View>
        <Card
          elevation={0}
          onPress={() =>
            this.goTo("ArticleDetail", { articleId: this.article.id })
          }
          style={vibeCardStyle.card}
        >
          <Card.Title
            title={this.article.title}
            subtitle={this.article.description}
            left={props => <Avatar.Icon {...props} icon="music-note" />}
          />
          <Card.Cover
            style={vibeCardStyle.media}
            source={{
              uri:
                "https://image.freepik.com/free-photo/creative-design-made-with-blue-orange-paper_23-2147981636.jpg"
            }}
          />
          <Card.Actions style={vibeCardStyle.actions}>
            <Button
              onPress={() =>
                this.goTo("ArticleDetail", { articleId: this.article.id })
              }
            >
              {translationUtil.translate("articleList.card.see")}
            </Button>
          </Card.Actions>
        </Card>
        <Divider />
      </View>
    );
  }

  @computed
  get article() {
    return this.props.article;
  }

  goTo = (path: string, options: any) => {
    const { navigation } = this.props;
    navigation.navigate(path, options);
  };
}
