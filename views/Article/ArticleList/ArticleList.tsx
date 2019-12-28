import React from "react";
import { View, Text, ScrollView } from "react-native";
import { INavigationProps } from "../../../common/INavigationProps";
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import { headerStore } from "../../../stores/header-store";
import { articleStore } from "../../../stores/article-store";
import { articleApi } from "../../../api/article-api";
import { userStore } from "../../../stores/user-store";
import { CardContainer } from "../../../components/layout-components/card-container/card-container";
import { translationUtil } from "../../../translation/translation-util";
import { roleUtils } from "../../../utils/RoleUtils";
import { IconButton } from "react-native-paper";
import { EmptyState } from "../../../components/empty-state/empty-state";
import { articleListStyle } from "./article-list-style";

@observer
export class ArticleListScreen extends React.Component<INavigationProps> {
  @observable
  isPopinOpen = false;

  @observable
  isButtonClicked = false;

  @observable
  showArrow = false;

  componentWillMount() {
    headerStore.headerTitle = "";
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
      <ScrollView>
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
      return <CardContainer />;
    }
    return (
      <EmptyState
        title={translationUtil.translate("articleList.emptyState.title")}
        description={this.DescriptionComponent}
        style={articleListStyle.container}
        icon={
          // <Icon className="file-icon" />
          <IconButton
            icon="assignment"
            // color={Colors.red500}
            size={20}
          />
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
