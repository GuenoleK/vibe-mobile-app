import axios from "axios";

const apiUrl = "api/account";
const apiResetPassword = `${apiUrl}/reset-password`;

class PasswordManagementApi {
  // tslint:disable-next-line: ter-arrow-body-style
  public requestResetPassword = (email: string) => {
    return axios.post(`${apiResetPassword}/init`, email.trim(), {
      headers: {
        "Content-Type": "text/plain"
      }
    });
  };

  // tslint:disable-next-line: ter-arrow-body-style
  public resetPassword = (key: string, newPassword: string) => {
    return axios.post(`${apiResetPassword}/finish`, { key, newPassword });
  };

  // tslint:disable-next-line: ter-arrow-body-style
  public changePassword = (currentPassword: string, newPassword: string) => {
    return axios.post(`${apiUrl}/change-password`, {
      currentPassword,
      newPassword
    });
  };
}

export const passwordManagementApi = new PasswordManagementApi();
