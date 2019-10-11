import axios from "axios";
import { AsyncStorage } from "react-native";
import { apiUtil } from "../utils/ApiUtil";

class RoleApi {
  getRoleByUserAndStructure = async (userId: number, structureId: number) => {
    const headers = {
      Authorization:
        "Bearer " + (await AsyncStorage.getItem(apiUtil.AUTH_TOKEN_KEY))
    };
    const response = await apiUtil.callApi(`roles/${userId}/${structureId}`, 'get', {headers});
    return response.data;
  };
}

export const roleAPi = new RoleApi();
