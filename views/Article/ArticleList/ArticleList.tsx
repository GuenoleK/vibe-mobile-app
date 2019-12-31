import { computed, observable } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { ScrollView, Text } from "react-native";
import {
  DarkTheme,
  DefaultTheme,
  IconButton,
  Colors
} from "react-native-paper";
import { articleApi } from "../../../api/article-api";
import { EmptyState } from "../../../components/empty-state/EmptyState";
import { CardContainer } from "../../../components/layout-components/card-container/CardContainer";
import { articleStore } from "../../../stores/article-store";
import { headerStore } from "../../../stores/header-store";
import { themeStore } from "../../../stores/theme-store";
import { userStore } from "../../../stores/user-store";
import { translationUtil } from "../../../translation/translation-util";
import { roleUtils } from "../../../utils/RoleUtils";
import { NavigationStackProp } from "react-navigation-stack";

type ArticleListScreenProps = {
  navigation: NavigationStackProp;
};

@observer
export class ArticleListScreen extends React.Component<ArticleListScreenProps> {
  @observable
  isPopinOpen = false;

  @observable
  isButtonClicked = false;

  @observable
  showArrow = false;

  componentWillMount() {
    headerStore.headerTitle = "Vibe";
  }

  async componentDidMount() {
    articleStore.articleList = await articleApi.getArticleListByStructureId(
      userStore.extendedUser.currentStructure.id
    );
    articleStore.searchableArticleList = articleStore.articleList;
  }

  componentWillUnmount() {
    articleStore.articleList = [];
    articleStore.searchableArticleList = [];
  }

  render() {
    return (
      <ScrollView
        style={{
          backgroundColor: themeStore.isDark
            ? DarkTheme.colors.background
            : DefaultTheme.colors.background
        }}
      >
        {this.ArticleList}
        {/* {articleStore.articleList.length === 0 && roleUtils.canEdit() && this.ArrowIcon}
        {roleUtils.canEdit() && (
          <div id="create-article-button" className="hide" data-is-clicked={this.isButtonClicked}>
            {this.CreateArticleButton}
            <CreateArticleDialog isPopinOpen={this.isPopinOpen} closePopin={this.closePopin} routerProps={this.props} />
          </div>
        )} */}
      </ScrollView>
    );
  }

  @computed
  get ArticleList() {
    if (articleStore.searchableArticleList.length > 0) {
      return <CardContainer navigation={this.props.navigation} />;
    }
    return (
      <EmptyState
        title={translationUtil.translate("articleList.emptyState.title")}
        description={this.DescriptionComponent}
        icon={
          <IconButton icon="clipboard-text" color={Colors.grey200} size={20} />
        }
      />
    );
  }

  get DescriptionComponent() {
    const description = roleUtils.canEdit()
      ? "articleList.emptyState.description"
      : "articleList.emptyState.descriptionViewer";
    return (
      <Text>{translationUtil.translate(description)}</Text>
      //   <div className="text">
      //     <div>{translationUtil.translate(description)}</div>
      //   </div>
    );
  }
}
