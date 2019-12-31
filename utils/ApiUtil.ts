import { AsyncStorage } from "react-native";
import axios, { AxiosRequestConfig } from "axios";

class ApiUtil {
  AUTH_TOKEN_KEY = "jhi-authenticationToken";

  baseUrl = this.getBaseUrl();

  private getBaseUrl() {
    if (process.env.NODE_ENV === "development") {
      return "http://192.168.0.34:8080/api";
    }
    return "https://epem-vibe.herokuapp.com/api";
  }

  async getHeader() {
    return {
      Authorization:
        "Bearer " + (await AsyncStorage.getItem(this.AUTH_TOKEN_KEY))
    };
  }

  callApi(
    url: string,
    method: "get" | "post" | "put" | "delete",
    options?: AxiosRequestConfig,
    data?: object
  ) {
    const finalUrl = `${this.baseUrl}/${url}`;
    switch (method) {
      case "post" || "put":
        return axios.post(finalUrl, data, options);
      default:
        return axios.get(finalUrl, options);
    }
  }
}

export const apiUtil = new ApiUtil();
