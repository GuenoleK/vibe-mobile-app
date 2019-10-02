import * as UserInterface from '../model/user.model';
import * as ExtendedUserInterface from '../model/extended-user.model';
import * as RoleInterface from '../model/role.model';
import { computed, observable } from 'mobx';
import { AUTH_TOKEN_KEY, loginApi } from '../api/login-api';
import { AsyncStorage } from 'react-native';
import { LanguageEnum } from '../enums/LanguageEnum';

type IUser = UserInterface.IUser;
type IExtendedUser = ExtendedUserInterface.IExtendedUser;
type IRole = RoleInterface.IRole;

class UserStore {
  @observable
  private innerUserRole: IRole = {};

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

  get hasCookie() {
    return AsyncStorage.getItem(AUTH_TOKEN_KEY) !== undefined;
  }

  get hasSession() {
    return AsyncStorage.getItem(AUTH_TOKEN_KEY) !== undefined;
  }

  get isConnected() {
    return this.hasCookie || this.hasSession;
  }

  async initUserStore() {
    if (this.hasCookie) {
      return loginApi.getAccountWithHeaderToken({ Authorization: 'Bearer ' + AsyncStorage.getItem(AUTH_TOKEN_KEY) });
    } else if (this.hasSession) {
      return loginApi.getAccountWithHeaderToken({ Authorization: 'Bearer ' + AsyncStorage.getItem(AUTH_TOKEN_KEY) });
    }
  }

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
