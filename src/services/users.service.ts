import { plainToInstance } from "class-transformer";
import { Endpoints } from "../helpers/ endpoints";
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
    const response = await ApiClient.instance.get(Endpoints.getSelf);
    if (response.status == 200) {
      let user: User = plainToInstance(User, [response.data])[0];
      return user;
    }
  }
}
