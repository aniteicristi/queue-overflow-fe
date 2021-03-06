import { Expose, Type } from "class-transformer";
import { Question } from "./Question.model";
import "reflect-metadata";
import { User } from "./User.model";
export class Answer {
  constructor(id: number, text: string, author: User, clout: number, createdAt: Date, question?: Question) {
    this.id = id;
    this.text = text;
    this.author = author;
    this.question = question;
    this.clout = clout;
    this.createdAt = createdAt;
  }

  @Expose()
  id: number;

  @Expose()
  text: string;

  @Type(() => User)
  author: User;

  @Type(() => Question)
  question?: Question;

  @Expose()
  clout: number;

  @Type(() => Date)
  createdAt: Date;
}
