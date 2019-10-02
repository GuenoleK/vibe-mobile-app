import React from 'react';
import { userStore } from '../stores/user-store';
import axios from 'axios';
import { snackbarStore } from '../stores/snackbar-store';
import { SnackbarTypeEnum } from '../enums/SnackbarEnum';
import { translationUtil } from '../translation/translation-util';

export const AUTH_TOKEN_KEY = 'jhi-authenticationToken';

const apiUrl = 'api/account';
const apiResetPassword = `${apiUrl}/reset-password`;

class PasswordManagementApi {
  // tslint:disable-next-line: ter-arrow-body-style
  public requestResetPassword = (email: string) => {
    return axios.post(`${apiResetPassword}/init`, email.trim(), {
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  };

  // tslint:disable-next-line: ter-arrow-body-style
  public resetPassword = (key: string, newPassword: string) => {
    return axios.post(`${apiResetPassword}/finish`, { key, newPassword });
  };

  // tslint:disable-next-line: ter-arrow-body-style
  public changePassword = (currentPassword: string, newPassword: string) => {
    return axios.post(`${apiUrl}/change-password`, { currentPassword, newPassword });
  };
}

export const passwordManagementApi = new PasswordManagementApi();
