import { Expose, Type } from "class-transformer";
import { Question } from "./Question.model";
import "reflect-metadata";
export class Answer {
  constructor(id: number, text: string, author: User, question: Question, clout: number, createdAt: Date) {
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
  question: Question;

  @Expose()
  clout: number;

  @Type(() => Date)
  createdAt: Date;
}
