// PDF icon from https://icons8.com/icon/set/pdf/material
import React from "react";
import { computed, autorun, observable } from "mobx";
import { observer } from "mobx-react";
import { articleMediaApi } from "../../../../api/article-media-api";
import { Card, Avatar, IconButton, Menu, Colors } from "react-native-paper";
import { translationUtil } from "../../../../translation/translation-util";
import { articleMediaStore } from "../../../../stores/article-media-store";
import { roleUtils } from "../../../../utils/RoleUtils";
import { articleStore } from "../../../../stores/article-store";
import { ArticleMediaTypeCodeEnum } from "../../../../enums/ArticleMediaTypeCodeEnum";
import { View, Text, StyleSheet, WebView } from "react-native";
import { EmptyState } from "../../../../components/empty-state/EmptyState";

interface IArticleCardProps {
  isLoadingData: boolean;
}

@observer
export class ArticleCard extends React.Component<IArticleCardProps> {
  @observable
  pdfFileSrc: any;

  @observable
  isMenuOpen = false;

  @observable
  menuAnchorElement: any;

  @observable
  isLoading = false;

  reaction = autorun(async () => {
    if (!this.isLoadingData && this.pdfMedia) {
      this.isLoading = true;
      // Mettre une sécurité de connexion ici et mettre une sécurité d'appartenance (fichier) dans le back
      const response = await articleMediaApi.getArticleMediaSrcFile(
        this.pdfMedia.id
      );
      this.pdfFileSrc = encodeURI(response);
      this.isLoading = false;
    }
  });

  styles = StyleSheet.create({
    container: {
      height: "80%",
      margin: 10,
      backgroundColor: Colors.amber400
    },
    cardHeader: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center"
    },
    cardTitle: {
      flex: 1
    }
  });

  render() {
    return (
      <Card style={this.styles.container}>
        <View style={this.styles.cardHeader}>
          <Card.Title
            style={this.styles.cardTitle}
            title={translationUtil.translate(
              "article.detail.pdfCard.header.title"
            )}
            left={props => <Avatar.Icon {...props} icon="playlist-music" />}
          />
          <Menu
            visible={this.isMenuOpen}
            onDismiss={this.openMenu}
            anchor={
              <IconButton
                disabled={
                  this.isLoading ||
                  this.isLoadingData ||
                  articleMediaStore.isAMediaLoading
                }
                onPress={this.openMenu}
                icon="dots-vertical"
              />
            }
          >
            {roleUtils.canEdit() && (
              <Menu.Item
                onPress={this.onChangePdfSelected}
                title={translationUtil.translate(
                  "article.detail.pdfCard.header.menu.modify"
                )}
              />
            )}
            {roleUtils.canEdit() && (
              <Menu.Item
                onPress={this.deletePdfFile}
                title={translationUtil.translate(
                  "article.detail.pdfCard.header.menu.delete"
                )}
              />
            )}
            <Menu.Item
              onPress={() => {}}
              title={translationUtil.translate(
                "article.detail.pdfCard.header.menu.download"
              )}
            />
          </Menu>
        </View>
        {this.pdfMedia && (
          <WebView
            bounces
            scrollEnabled
            source={{
              uri: `https://drive.google.com/viewerng/viewer?embedded=true&url=${this.pdfFileSrc}`
            }}
          />
        )}
      </Card>
    );
  }

  openMenu = () => {
    this.isMenuOpen = !this.isMenuOpen;
  };

  @computed
  get isLoadingData() {
    return this.props.isLoadingData;
  }

  get EmptyCardContent() {
    if (
      !this.isLoadingData &&
      !this.isLoading &&
      !this.pdfMedia &&
      roleUtils.canEdit()
    ) {
      return this.UploadComponent;
    } else if (
      !this.isLoadingData &&
      !this.isLoading &&
      !this.pdfMedia &&
      !roleUtils.canEdit()
    ) {
      return this.EmptyState;
    }
  }

  get UploadComponent() {
    return (
      <View>
        <Text>Dropzone</Text>
      </View>
    );
  }

  get EmptyState() {
    const description = roleUtils.canEdit()
      ? "article.detail.pdfCard.uploadZone.description.common"
      : "article.detail.pdfCard.uploadZone.description.commonViewer";
    return (
      <View>
        <EmptyState
          title={translationUtil.translate(
            "article.detail.pdfCard.uploadZone.title"
          )}
          description={translationUtil.translate(description)}
          icon={
            <IconButton
              icon="clipboard-text"
              color={Colors.green400}
              size={20}
            />
          }
        />
      </View>
    );
  }

  get uploadDescriptionText() {
    if (
      navigator.userAgent.match(
        /Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i
      )
    ) {
      return translationUtil.translate(
        "article.detail.pdfCard.uploadZone.description.mobile"
      );
    }
    return translationUtil.translate(
      "article.detail.pdfCard.uploadZone.description.common"
    );
  }

  //   renderPdf-()

  openPdf = () => {
    window.open(
      encodeURI(`https://docs.google.com/gview?url=${this.pdfFileSrc}`),
      "_blank",
      "fullscreen=yes,location=yes,EnableViewPortScale=yes"
    );
  };

  @computed
  get article() {
    return articleStore.article;
  }

  @computed
  get pdfMedia() {
    return articleMediaStore.articleMediaList.find(
      media => media.articleMediaType.code === ArticleMediaTypeCodeEnum.PDF
    );
  }

  onDrop = async acceptedFiles => {
    this.isLoading = true;
    articleMediaStore.isAMediaLoading = this.isLoading;
    if (this.pdfMedia) {
      await articleMediaApi.updateArticleMedia(
        acceptedFiles[0],
        this.pdfMedia,
        this.article.id
      );
    } else {
      await articleMediaApi.saveArticleMedia(
        acceptedFiles[0],
        this.article.id,
        ArticleMediaTypeCodeEnum.PDF
      );
    }
    this.isLoading = false;
    articleMediaStore.isAMediaLoading = this.isLoading;
  };

  deletePdfFile = async () => {
    this.isLoading = true;
    articleMediaStore.isAMediaLoading = this.isLoading;
    if (this.pdfMedia) {
      await articleMediaApi.deleteArticleMedia(this.pdfMedia, this.article.id);
    }
    this.isLoading = false;
    articleMediaStore.isAMediaLoading = this.isLoading;
  };

  onChangeLyrics = e => {
    if (e.target.files.length > 0) {
      this.onDrop(e.target.files);
    }
  };

  onChangePdfSelected = () => {
    const input = document.querySelector("#upload-updated-pdf") as HTMLElement;
    if (input) {
      input.click();
    }
  };
}
