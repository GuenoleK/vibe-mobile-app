import * as UserInterface from "../model/user.model";
import * as ExtendedUserInterface from "../model/extended-user.model";
import * as RoleInterface from "../model/role.model";
import { computed, observable, action, toJS } from "mobx";
import { AsyncStorage } from "react-native";
import { apiUtil } from "../utils/ApiUtil";

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

  @action
  clearUser() {
    this.innerUser = {};
  }
}

export const userStore = new UserStore();
