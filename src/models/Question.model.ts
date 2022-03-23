import { Expose, Type, Transform, plainToClass, plainToInstance } from "class-transformer";

export class Question {
  constructor(author: User, title: string, text: string, createdAt: Date, clout: number) {
    this.author = author;
    this.text = text;
    this.title = title;
    this.createdAt = createdAt;
    this.clout = clout;
  }

  @Expose()
  id: number | undefined;

  @Transform((val) => plainToInstance(User, val))
  author: User;

  @Expose()
  title: string;

  @Expose()
  text: string;

  @Expose()
  createdAt: Date;

  // @Expose()
  // tags: Tag[];

  @Expose()
  clout: number;
}
