import * as UserInterface from "../model/user.model";
import * as ExtendedUserInterface from "../model/extended-user.model";
import * as RoleInterface from "../model/role.model";
import { computed, observable, action, toJS } from "mobx";
import { loginApi } from "../api/login-api";
import { AsyncStorage } from "react-native";
import { LanguageEnum } from "../enums/LanguageEnum";
import { apiUtil } from "../utils/ApiUtil";
import { userApi } from "../api/user-apix";
import { roleAPi } from "../api/role-api";
import { initializeTranslation } from "../translation/translation-initializer";

type IUser = UserInterface.IUser;
type IExtendedUser = ExtendedUserInterface.IExtendedUser;
type IRole = RoleInterface.IRole;

class UserStore {
  @observable
  private innerUserRole: IRole = {};

  @observable
  isUserConnected;

  @computed
  get userRole(): IRole {
    return this.innerUserRole;
  }

  set userRole(userRole: IRole) {
    this.innerUserRole = { ...this.innerUserRole, ...userRole };
  }

  @observable
  private innerExtendedUser: IExtendedUser = {};

  @computed
  get extendedUser(): IExtendedUser {
    return this.innerExtendedUser;
  }

  set extendedUser(extendedUser: IExtendedUser) {
    this.innerExtendedUser = { ...this.innerExtendedUser, ...extendedUser };
  }

  @observable
  private innerUser: IUser = {};

  @computed
  get user(): IUser {
    return this.innerUser;
  }

  set user(user: IUser) {
    this.innerUser = { ...this.innerUser, ...user };
  }

  async isConnected() {
    return await AsyncStorage.getItem(apiUtil.AUTH_TOKEN_KEY) ? true : false;
  }

  async initUserStore() {
    let user;
    if (await this.isConnected()) {
      user = await loginApi.getAccountWithHeaderToken({
        Authorization:
          "Bearer " + (await AsyncStorage.getItem(apiUtil.AUTH_TOKEN_KEY))
      });
    }
    
    if (user && user.id) {
      userStore.extendedUser = await userApi.getExtendedUser(userStore.user.id);
      userStore.userRole = await roleAPi.getRoleByUserAndStructure(
        userStore.user.id,
        userStore.extendedUser.currentStructure.id
        );
        if (user.langKey) {
          initializeTranslation(user.langKey);
        }
      } else {
        initializeTranslation();
      }
      this.isUserConnected = await this.isConnected();
    return user;
  }

  @action
  clearUser() {
    this.innerUser = {};
  }

  changeLanguage = (language: LanguageEnum) => {
    this.user.langKey = language;
    loginApi.updateUser(userStore.user).then(() => {
      window.location.reload();
    });
  };
}

export const userStore = new UserStore();
