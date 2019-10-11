import axios from "axios";
import { AsyncStorage } from "react-native";
import { apiUtil } from "../utils/ApiUtil";

class UserApi {
  getExtendedUser = async (userId: number) => {
    const headers = {
      Authorization:
        "Bearer " + (await AsyncStorage.getItem(apiUtil.AUTH_TOKEN_KEY))
    };
    const response = await apiUtil.callApi(`extended-users/user/${userId}`, 'get', {headers});
    return response.data;
  };
}

export const userApi = new UserApi();
