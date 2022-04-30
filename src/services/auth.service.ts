import { reactive, Ref, ref } from "vue";
import { ApiClient } from "./api.client";

export class AuthService {
  private static _instance: AuthService;

  public static get instance() {
    if (AuthService._instance == null) {
      AuthService._instance = new AuthService();
      return AuthService._instance;
    } else return AuthService._instance;
  }

  private constructor() {
    this.isLoggedIn = ref(false);
    this.token = window.localStorage.getItem("access_token") ?? "";
    if (this.token != "") this.isLoggedIn.value = true;
    console.log(`Token is ${this.token}`);
    console.log(`Logged in is: ${this.isLoggedIn.value}`);
  }

  token: string = "";

  isLoggedIn;

  public async login(email: string, password: string): Promise<number> {
    const response = await ApiClient.instance.post("auth/login", {
      username: email,
      password: password,
    });
    if (response.status == 201) {
      this.isLoggedIn.value = true;
      this.token = (await response.data).token;
      window.localStorage.setItem("access_token", this.token);
    }

    return response.status;
  }

  public logout() {
    this.token = "";
    this.isLoggedIn.value = false;
    window.localStorage.removeItem("access_token");
  }
}
