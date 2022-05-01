import { plainToInstance } from "class-transformer";
import { ref, Ref } from "vue";
import { Endpoints } from "../helpers/ endpoints";
import { User, UserRole } from "../models/User.model";
import { ApiClient } from "./api.client";

export class UserService {
  private static _instance: UserService | null;

  public static get instance() {
    if (UserService._instance == null) {
      UserService._instance = new UserService();
      return UserService._instance;
    } else return UserService._instance;
  }

  constructor() {
    this.currentUser = ref(null);
  }

  public currentUser: Ref<User | null>;

  public async getCurrentUser(): Promise<User | null> {
    if (this.currentUser.value != null) return this.currentUser.value;
    const response = await ApiClient.instance.get(Endpoints.getSelf);
    if (response.status == 200) {
      this.currentUser.value = plainToInstance(User, [response.data])[0];
    }
    return this.currentUser.value;
  }

  public async getUser(id: number): Promise<User | undefined> {
    const response = await ApiClient.instance.get(`${Endpoints.getUser}/${id}`);
    if (response.status == 200) {
      let user: User = plainToInstance(User, [response.data])[0];
      return user;
    }
  }
}
