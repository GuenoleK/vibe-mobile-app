import React from "react";
import { observer } from "mobx-react";
import { ScrollView } from "react-native-gesture-handler";
import { View, Text } from "react-native";
import { NavigationStackProp } from "react-navigation-stack";
import { observable, computed } from "mobx";
import { headerStore } from "../../../stores/header-store";
import { articleStore } from "../../../stores/article-store";
import { articleMediaStore } from "../../../stores/article-media-store";
import { audioStore } from "../../../stores/audio-store";
import { roleUtils } from "../../../utils/RoleUtils";
import { ArticleMediaTypeCodeEnum } from "../../../enums/ArticleMediaTypeCodeEnum";
import { articleMediaApi } from "../../../api/article-media-api";
import { articleApi } from "../../../api/article-api";
import { ArticleCard } from "./ArticleCard/ArticleCard";
import { EmptyState } from "../../../components/empty-state/EmptyState";
import { IconButton, Colors, FAB } from "react-native-paper";
import { translationUtil } from "../../../translation/translation-util";
import { articleDetailStyle } from "./article-detail-style";
import { fabStyle } from "../../../common/styles/fab-style";

type ArticleDetailProps = {
  navigation: NavigationStackProp<{ articleId: number }>;
};

@observer
export class ArticleDetail extends React.Component<ArticleDetailProps> {
  @observable
  isLoading = false;

  componentWillMount() {
    headerStore.headerTitle = "";

    // Here clear articleMediaList in the store
    articleStore.article = undefined;
    articleMediaStore.articleMediaList = [];
  }

  async componentDidMount() {
    headerStore.canShowSearchBar = false;
    // Here call the web service that will give the file names
    if (this.articleId) {
      this.isLoading = true;
      articleStore.article = await articleApi.getArticle(this.articleId);
      articleMediaStore.articleMediaList = await articleMediaApi.getArticleMediaListByArticleId(
        this.articleId
      );
      this.isLoading = false;
      headerStore.headerTitle = articleStore.article.title;
    }
  }

  // Not called, maybe the router is the cause.
  // TODO: see the problem
  componentWillUnMount() {
    headerStore.headerTitle = "";

    // Here clear articleMediaList in the store
    articleStore.article = undefined;
    articleMediaStore.articleMediaList = [];

    // We stop any music if we change the page
    // And unset the audio element in the store
    if (audioStore.isMusicPlaying) {
      audioStore.stopMusic();
    }
    audioStore.currentPlayingAudio = undefined;
  }

  render() {
    return (
      //   <div data-component="vibe-article">
      //     {this.isLoading && <Spinner hasDescription loadingText={translationUtil.translate('loader.description.isLoading')} />}
      //     {!this.isLoading && this.MediaContent}
      //   </div>
      <View style={articleDetailStyle.container}>
        {this.MediaContent}
        <FAB
          style={fabStyle.fab}
          icon="plus"
          onPress={() => console.log("Pressed")}
          label="hello"
        />
      </View>
    );
  }

  get MediaContent() {
    if (
      articleMediaStore.articleMediaList.length === 0 &&
      !roleUtils.hasRole(roleUtils.rolesForEdition)
    ) {
      return this.ContentEmptyState;
    }
    return (
      <View style={articleDetailStyle.content}>
        <ArticleCard isLoadingData={this.isLoading} />
      </View>
    );
  }

  get ContentEmptyState() {
    return (
      <View>
        <EmptyState
          title={translationUtil.translate(
            "article.detail.content.emptyState.title"
          )}
          description={translationUtil.translate(
            "article.detail.content.emptyState.description"
          )}
          icon={
            <IconButton
              icon="clipboard-text"
              color={Colors.grey600}
              size={36}
            />
          }
        />
      </View>
    );
  }

  @computed
  get audioList() {
    return articleMediaStore.articleMediaList.filter(
      media => media.articleMediaType.code === ArticleMediaTypeCodeEnum.AUDIO
    );
  }

  get articleId() {
    return this.props.navigation.getParam("articleId");
  }
}
