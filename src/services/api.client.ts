import { AuthService } from "./auth.service";
import questions from "../mocks/questions.json";
import axios, { Axios, AxiosResponse } from "axios";
export class ApiClient {
  private static _instance: ApiClient;

  private baseurl: string = "http://localhost:8000/";

  private axiosInstance: Axios;

  public static get instance() {
    if (ApiClient._instance == null) {
      ApiClient._instance = new ApiClient();
      return ApiClient._instance;
    } else return ApiClient._instance;
  }

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: this.baseurl,
      timeout: 1000,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: `Bearer ${AuthService.instance.token}`,
        "Content-Type": "application/json",
      },
    });
  }

  public async get(path: string): Promise<AxiosResponse> {
    return this.axiosInstance.get(path);
  }

  public async post(path: string, body: any): Promise<AxiosResponse> {
    return this.axiosInstance.post(path, body);
  }
}
