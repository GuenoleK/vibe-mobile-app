import { userStore } from '../stores/user-store';
import axios from 'axios';
import { snackbarStore } from '../stores/snackbar-store';
import { SnackbarTypeEnum } from '../enums/SnackbarEnum';
import { toJS } from 'mobx';

export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

class UserApi {
  getExtendedUser = (userId: number) => axios.get(`api/extended-users/user/${userId}`).then(response => response.data);
}

export const userApi = new UserApi();
