import { Question } from "../models/Question.model";

class QuestionsService {
  private static _instance: QuestionsService;

  public static get instance() {
    if (QuestionsService._instance == null) {
      QuestionsService._instance = new QuestionsService();
      return QuestionsService._instance;
    } else return QuestionsService._instance;
  }

  private constructor() {
    this.questions = [];
  }

  private questions: Question[];

  public getAll(): Question[] {
    return [];
  }
}
