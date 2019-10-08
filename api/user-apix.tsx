import axios from "axios";

class UserApi {
  getExtendedUser = (userId: number) =>
    axios
      .get(`api/extended-users/user/${userId}`)
      .then(response => response.data);
}

export const userApi = new UserApi();
