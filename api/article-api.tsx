import { userStore } from "../stores/user-store";
import axios from "axios";
import { snackbarStore } from "../stores/snackbar-store";
import { SnackbarTypeEnum } from "../enums/SnackbarEnum";
import * as ArticleInterface from "../model/article.model";
import { apiUtil } from "../utils/ApiUtil";
import { translationUtil } from "../translation/translation-util";
import { AsyncStorage } from "react-native";

type IArticle = ArticleInterface.IArticle;

class ArticleApi {
  /**
   * Authenticate the user
   */
  public getArticleListByStructureId = async (structureId: number) => {
    let error;
    let headers = {};

    if (userStore.isConnected()) {
      headers = {
        Authorization:
          "Bearer " + (await AsyncStorage.getItem(apiUtil.AUTH_TOKEN_KEY))
      };
    }

    try {
      const response = await apiUtil.callApi(
        `articles/structure/${structureId}`,
        "get",
        { headers }
      );
      if (response && response.status === 200) {
        return response.data;
      } else if (response && response.status !== 200) {
        snackbarStore.openSnackbar(
          SnackbarTypeEnum.INFO,
          `Status error ${response.status}`
        );
        throw new Error(`Status error ${response.status}`);
      }
    } catch (e) {
      error = e.response;
    }

    if (error) {
      snackbarStore.openSnackbar(
        SnackbarTypeEnum.INFO,
        `Error status: ${error.status}, error text: ${error.statusText}`
      );
      throw new Error(
        `Error status: ${error.status}, error text: ${error.statusText}`
      );
    }
  };

  /**
   * Authenticate the user
   */
  public getArticle = async (articleId: number) => {
    let error;
    let headers = {};

    if (userStore.isConnected()) {
      headers = {
        Authorization:
          "Bearer " + (await AsyncStorage.getItem(apiUtil.AUTH_TOKEN_KEY))
      };
    }

    try {
      const response = await apiUtil.callApi(`articles/${articleId}`, 'get', {headers});
      if (response && response.status === 200) {
        return response.data;
      } else if (response && response.status !== 200) {
        snackbarStore.openSnackbar(
          SnackbarTypeEnum.INFO,
          `Status error ${response.status}`
        );
        throw new Error(`Status error ${response.status}`);
      }
    } catch (e) {
      error = e.response;
    }

    if (error) {
      snackbarStore.openSnackbar(
        SnackbarTypeEnum.INFO,
        `Error status: ${error.status}, error text: ${error.statusText}`
      );
      throw new Error(
        `Error status: ${error.status}, error text: ${error.statusText}`
      );
    }
  };

  public saveArticle = async (article: IArticle) => {
    let error;
    const header = apiUtil.getHeader();
    if (article.title) {
      try {
        // const response = await apiUtil.callApi(`articles`, 'post', undefined, article);
        return axios
          .post(`api/articles`, article)
          .then(response => {
            if (response && response.status === 201) {
              snackbarStore.openSnackbar(
                SnackbarTypeEnum.SUCCESS,
                translationUtil.translate("createNewSongPopin.message.success")
              );
              return response.data;
            } else if (response && response.status !== 201) {
              snackbarStore.openSnackbar(
                SnackbarTypeEnum.INFO,
                `Status error ${response.status}`
              );
              throw new Error(`Status error ${response.status}`);
            } else if (response && response.status === 500) {
              snackbarStore.openSnackbar(
                SnackbarTypeEnum.ERROR,
                `STATUS: ${response.status}`
              );
              throw new Error(`Status error ${response.status}`);
            }
          })
          .catch((err: any) => {
            snackbarStore.openSnackbar(
              SnackbarTypeEnum.ERROR,
              `${err}, Ce titre existe déjà`
            );
            throw new Error(`Regarder les logs pour plus de précision. ${err}`);
          });
      } catch (e) {
        error = e.response;
        snackbarStore.openSnackbar(
          SnackbarTypeEnum.INFO,
          `Error status: ${error.status}, error text: ${error.statusText}`
        );
        throw new Error(
          `Error status: ${error.status}, error text: ${error.statusText}`
        );
      }
    } else if (article.title === undefined || article.title.trim() === "") {
      snackbarStore.openSnackbar(
        SnackbarTypeEnum.INFO,
        "Il faut remplir tous les champs"
      );
      throw new Error("Il faut remplir tous les champs");
    }
  };
}

export const articleApi = new ArticleApi();
