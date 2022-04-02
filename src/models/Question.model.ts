import { Expose, Type, Transform, plainToClass, plainToInstance } from "class-transformer";
import { Tag } from "./Tag.model";
import "reflect-metadata";

export class Question {
  constructor(author: User, title: string, text: string, createdAt: Date, clout: number, tags: Tag[]) {
    this.author = author;
    this.text = text;
    this.title = title;
    this.createdAt = createdAt;
    this.clout = clout;
    this.tags = tags;
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
}
