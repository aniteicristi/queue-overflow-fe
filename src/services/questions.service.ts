import { plainToInstance } from "class-transformer";
import { Question } from "../models/Question.model";
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
      this.questions = plainToInstance(Question, result.data);
    }
    return this.questions;
  }

  public async get(question: string | string[]): Promise<Question> {
    const result = await ApiClient.instance.get(`questions/${question}`);
    return plainToInstance(Question, result.data)[0];
  }
}
