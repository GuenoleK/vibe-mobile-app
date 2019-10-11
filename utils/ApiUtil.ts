import { AsyncStorage } from "react-native";
import axios, { AxiosRequestConfig } from "axios";

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

  callApi(url: string, method: 'get' | 'post', options?: AxiosRequestConfig, data?: object) {
    const finalUrl = `${this.baseUrl}/${url}`;
    switch (method) {
      case 'get':
        return axios.get(finalUrl, options);
      case 'post':
        return axios.post(finalUrl, data, options);
      default:
        return;
    }
  }
}

export const apiUtil = new ApiUtil();
