import { Expose, Type, Transform, plainToClass, plainToInstance } from "class-transformer";
import { Tag } from "./Tag.model";
import "reflect-metadata";
import { User } from "./User.model";
import { Answer } from "./Answer.model";

export class Question {
  constructor(author: User, title: string, text: string, createdAt: Date, clout: number, tags: Tag[], answers: Answer[]) {
    this.author = author;
    this.text = text;
    this.title = title;
    this.createdAt = createdAt;
    this.clout = clout;
    this.tags = tags;
    this.answer = answers;
  }

  @Expose()
  id: number | undefined;

  @Type(() => User)
  author: User;

  @Expose()
  title: string;

  @Expose()
  text: string;

  @Type(() => Date)
  createdAt: Date;

  @Type(() => Tag)
  tags: Tag[];

  @Expose()
  clout: number;

  @Type(() => Answer)
  answer: Answer[];
}
