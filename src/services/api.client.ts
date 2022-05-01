import { AuthService } from "./auth.service";
import axios, { Axios, AxiosResponse } from "axios";
export class ApiClient {
  private static _instance: ApiClient;

  private static baseurl: string = "http://localhost:8000/";

  private axiosInstance: Axios;

  public static login(username: string, password: string): Promise<AxiosResponse> {
    return axios.post(ApiClient.baseurl + "auth/login", {
      username: username,
      password: password,
    });
  }

  public static get instance() {
    if (ApiClient._instance == null) {
      ApiClient._instance = new ApiClient();
      return ApiClient._instance;
    } else return ApiClient._instance;
  }

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: ApiClient.baseurl,
      timeout: 1000,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${AuthService.instance.token}`,
        "Content-Type": "application/json",
      },
    });
  }
  public setToken(token: string) {
    this.axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  public async get(path: string): Promise<AxiosResponse> {
    return this.axiosInstance.get(path);
  }

  public async post(path: string, body: any): Promise<AxiosResponse> {
    return this.axiosInstance.post(path, body);
  }
  public async delete(path: string): Promise<AxiosResponse> {
    return this.axiosInstance.delete(path);
  }
  public async patch(path: string, body: any): Promise<AxiosResponse> {
    return this.axiosInstance.patch(path, body);
  }
}
