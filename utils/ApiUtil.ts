import { AsyncStorage } from "react-native";

class ApiUtil {
  AUTH_TOKEN_KEY = "jhi-authenticationToken";

  baseUrl = this.getBaseUrl();

  private getBaseUrl() {
    if (process.env.NODE_ENV === "development") {
      return "http://192.168.0.33:8080/api";
    }
    return "https://epem-vibe.herokuapp.com/api";
  }

  async getHeader() {
    return {
      Authorization:
        "Bearer " + (await AsyncStorage.getItem(this.AUTH_TOKEN_KEY))
    };
  }
}

export const apiUtil = new ApiUtil();
