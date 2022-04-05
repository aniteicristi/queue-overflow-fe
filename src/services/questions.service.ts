import { plainToInstance } from "class-transformer";
import { Answer } from "../models/Answer.model";
import { Question } from "../models/Question.model";
import { Tag } from "../models/Tag.model";
import { User, UserRole } from "../models/User.model";
import { ApiClient } from "./api.client";

export class QuestionsService {
  private static _instance: QuestionsService;

  public static get instance() {
    if (QuestionsService._instance == null) {
      QuestionsService._instance = new QuestionsService();
      return QuestionsService._instance;
    } else return QuestionsService._instance;
  }
  private questions: Question[];

  private constructor() {
    this.questions = <Question[]>[];
  }

  public async getAll(): Promise<Question[]> {
    if (this.questions.length == 0) {
      const result = await ApiClient.instance.get("questions");
      this.questions = plainToInstance(Question, await result.json());
    }
    return this.questions;
  }

  public async get(question: string | string[]): Promise<Question> {
    // const result = await ApiClient.instance.get(`questions/${question}`);
    // return plainToInstance(Question, result.data)[0];
    return new Question(
      new User(123, "hilo", UserRole.NORMAL, 0),
      "Hello",
      "World",
      new Date("2001/12/01"),
      0,
      [new Tag("hello"), new Tag("world")],
      [new Answer(123, "Hi there, new phone, who dis?", new User(123, "hilo", UserRole.NORMAL, 0), 2, new Date("2001/12/01"))]
    );
  }
}
