import { userStore } from "../stores/user-store";
import * as UserInterface from "../model/user.model";
import axios from "axios";
import { snackbarStore } from "../stores/snackbar-store";
import { SnackbarTypeEnum } from "../enums/SnackbarEnum";
import { translationUtil } from "../translation/translation-util";
import { AsyncStorage } from "react-native";
import { apiUtil } from "../utils/ApiUtil";

type IUser = UserInterface.IUser;

class LoginApi {
  /**
   * Authenticate the user
   */
  public authenticate = async () => {
    // The user have to fill all inputs to try a login
    if (userStore.user.login && userStore.user.password) {
      const rememberMe = true;

      let response;
      let error;

      // We try to connect the user
      try {
        response = await axios.post(`${apiUtil.baseUrl}/authenticate`, {
          username: userStore.user.login,
          password: userStore.user.password,
          rememberMe
        });
      } catch (e) {
        error = e.response;
      }

      // When the connection is ok, we set the connection
      if (response && response.status === 200) {
        const bearerToken = response.headers.authorization;
        if (bearerToken && bearerToken.slice(0, 7) === "Bearer ") {
          const jwt = bearerToken.slice(7, bearerToken.length);
          if (rememberMe) {
            await AsyncStorage.setItem(apiUtil.AUTH_TOKEN_KEY, jwt);
          } else {
            await AsyncStorage.setItem(apiUtil.AUTH_TOKEN_KEY, jwt);
          }
        }
        // this.login();
        await this.getAccountWithHeaderToken({
          Authorization:
            "Bearer " + (await AsyncStorage.getItem(apiUtil.AUTH_TOKEN_KEY))
        });
      } else if (response && response.status !== 200) {
        snackbarStore.openSnackbar(
          SnackbarTypeEnum.ERROR,
          `Status error ${response.status}`
        );
        throw new Error(`Status error ${response.status}`);
      } else {
        // When it failed, we inform the user something wrong append
        if (error) {
          if (error.data.detail === "Bad credentials") {
            snackbarStore.openSnackbar(
              SnackbarTypeEnum.ERROR,
              translationUtil.translate("account.login.badCredentialsError")
            );
          } else {
            snackbarStore.openSnackbar(
              SnackbarTypeEnum.ERROR,
              translationUtil.translate(
                "account.login.impossibleToConnectError"
              )
            );
          }
          throw new Error(
            `Error status: ${error.status}, error text: ${error.statusText}`
          );
        }
      }
    } else {
      // When the user has filled no input, we inform him to do so
      snackbarStore.openSnackbar(
        SnackbarTypeEnum.WARNING,
        `You have to fill all the inputs`
      );
      throw new Error(`You have to fill all the inputs`);
    }
  };

  login = () => {
    let error;

    try {
      axios.get(`${apiUtil.baseUrl}/account`).then(response => {
        if (response && response.status === 200) {
          userStore.user = response.data;

          // We get the associated Extended User
          axios
            .get(`${apiUtil.baseUrl}/extended-users/user/${userStore.user.id}`)
            .then(extUserResponse => {
              userStore.extendedUser = extUserResponse.data;
            });
        } else if (response && response.status !== 200) {
          snackbarStore.openSnackbar(
            SnackbarTypeEnum.INFO,
            `Status error ${response.status}`
          );
          throw new Error(`Status error ${response.status}`);
        }
      });
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

  getAccountWithHeaderToken = async (header: any) => {
    let error;

    try {
      return axios
        .get(`${apiUtil.baseUrl}/account`, { headers: header })
        .then(response => {
          if (response && response.status === 200) {
            userStore.user = response.data;

            // We get the associated Extended User
            axios
              .get(
                `${apiUtil.baseUrl}/extended-users/user/${userStore.user.id}`,
                { headers: header }
              )
              .then(extUserResponse => {
                userStore.extendedUser = extUserResponse.data;
              });
            return response.data;
          } else if (response && response.status !== 200) {
            snackbarStore.openSnackbar(
              SnackbarTypeEnum.INFO,
              `Status error ${response.status}`
            );
            throw new Error(`Status error ${response.status}`);
          }
        });
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

  public updateUser = async (user: IUser) => {
    try {
      await axios.post(`${apiUtil.baseUrl}/account`, user);
    } catch (e) {
      snackbarStore.openSnackbar(
        SnackbarTypeEnum.ERROR,
        translationUtil.translate("account.update.user.error")
      );
      throw new Error(`Status error ${e.message}`);
    }
  };
}

export const loginApi = new LoginApi();
