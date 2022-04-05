import { Expose } from "class-transformer";

export enum UserRole {
  NORMAL = "normal",
  MODERATOR = "moderator",
  BANNED = "banned",
}

export class User {
  constructor(id: number, email: string, role: UserRole, score: number) {
    this.id = id;
    this.email = email;
    this.role = role;
    this.score = score;
  }

  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  role: UserRole;

  @Expose()
  score: number;

  public getUserUrl(): string {
    return `https://avatars.dicebear.com/api/micah/${this.email}.svg`;
  }
}
