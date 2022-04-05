import { plainToInstance } from "class-transformer";
import { User, UserRole } from "../models/User.model";
import { ApiClient } from "./api.client";

export class UserService {
  private static _instance: UserService;

  public static get instance() {
    if (UserService._instance == null) {
      UserService._instance = new UserService();
      return UserService._instance;
    } else return UserService._instance;
  }

  private constructor() {}

  public async getCurrentUser(): Promise<User | undefined> {
    return new User(123, "GigaChad@gmail.com", UserRole.NORMAL, 23);
    const response = await ApiClient.instance.get("users/self");
    if (response.status == 200) {
      return plainToInstance(User, await response.json())[0];
    }
  }
}
