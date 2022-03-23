class ApiClient {
  private static _instance: ApiClient;

  public static get instance() {
    if (ApiClient._instance == null) {
      ApiClient._instance = new ApiClient();
      return ApiClient._instance;
    } else return ApiClient._instance;
  }

  public get(path: string): any {}
}
