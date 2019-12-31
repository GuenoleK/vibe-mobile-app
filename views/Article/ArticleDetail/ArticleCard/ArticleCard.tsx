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
import { View, Text } from "react-native";
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

  render() {
    return (
      <Card>
        {this.article && (
          <Card.Content>
            <Card.Title
              title={translationUtil.translate(
                "article.detail.pdfCard.header.title"
              )}
              left={props => <Avatar.Icon {...props} icon="playlist-music" />}
            />
            {this.pdfMedia && (
              <View>
                <Menu
                  visible={this.isMenuOpen}
                  onDismiss={this.openMenu}
                  anchor={
                    <IconButton onPress={this.openMenu} icon="dots-vertical" />
                  }
                >
                  <Menu.Item onPress={() => {}} title="Item 1" />
                  <Menu.Item onPress={() => {}} title="Item 2" />
                  <Menu.Item onPress={() => {}} title="Item 3" />
                </Menu>
              </View>
              //   <div className="card-menu">
              //     <input
              //       id="upload-updated-pdf"
              //       multiple={false}
              //       type="file"
              //       accept="application/pdf"
              //       onChange={this.onChangeLyrics}
              //     />
              //     <IconButton
              //       disabled={
              //         this.isLoading ||
              //         this.isLoadingData ||
              //         articleMediaStore.isAMediaLoading
              //       }
              //       className="article-more-button"
              //       onClick={this.openMenu}
              //     >
              //       <MoreVertIcon className="article-more-icon" />
              //       <Menu
              //         open={this.isMenuOpen}
              //         anchorEl={this.menuAnchorElement}
              //         getContentAnchorEl={null}
              //         anchorOrigin={{
              //           vertical: "bottom",
              //           horizontal: "right"
              //         }}
              //         transformOrigin={{
              //           vertical: "top",
              //           horizontal: "right"
              //         }}
              //       >
              //         {roleUtils.canEdit() && (
              //           <MenuItem onClick={this.onChangePdfSelected}>
              //             {translationUtil.translate(
              //               "article.detail.pdfCard.header.menu.modify"
              //             )}
              //           </MenuItem>
              //         )}
              //         {roleUtils.canEdit() && (
              //           <MenuItem onClick={this.deletePdfFile}>
              //             {translationUtil.translate(
              //               "article.detail.pdfCard.header.menu.delete"
              //             )}
              //           </MenuItem>
              //         )}
              //         <a
              //           className="menu-option-download download-pdf"
              //           href={this.pdfFileSrc}
              //           download={this.pdfMedia.name}
              //         >
              //           <MenuItem>
              //             {translationUtil.translate(
              //               "article.detail.pdfCard.header.menu.download"
              //             )}
              //           </MenuItem>
              //         </a>
              //       </Menu>
              //     </IconButton>
              //   </div>
            )}
          </Card.Content>
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
