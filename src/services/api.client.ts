import { AuthService } from "./auth.service";

export class ApiClient {
  private static _instance: ApiClient;

  private baseurl: string = "http://localhost:8000/";

  public static get instance() {
    if (ApiClient._instance == null) {
      ApiClient._instance = new ApiClient();
      return ApiClient._instance;
    } else return ApiClient._instance;
  }

  public async get(path: string): Promise<any> {
    return window.fetch(this.baseurl + path, {
      method: "GET",
      mode: "cors",
      headers: {
        Authentication: `Bearer ${AuthService.instance.token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    });
  }

  public async post(path: string, body: any): Promise<Response> {
    return window.fetch(this.baseurl + path, {
      method: "POST",
      mode: "cors",
      headers: {
        Authentication: `Bearer ${AuthService.instance.token}`,
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }
}
