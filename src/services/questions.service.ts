import { plainToInstance } from "class-transformer";
import { ref, Ref } from "vue";
import { Answer } from "../models/Answer.model";
import { Question } from "../models/Question.model";
import { Tag } from "../models/Tag.model";
import { User, UserRole } from "../models/User.model";
import { ApiClient } from "./api.client";
import { UserService } from "./users.service";

export class QuestionsService {
  private static _instance: QuestionsService;

  public static get instance() {
    if (QuestionsService._instance == null) {
      QuestionsService._instance = new QuestionsService();
      return QuestionsService._instance;
    } else return QuestionsService._instance;
  }
  public questions: Ref<Question[]>;

  private constructor() {
    this.questions = ref<Question[]>([]);
  }

  public async getAll(): Promise<Ref<Question[]>> {
    if (this.questions.value.length == 0) {
      const result = await ApiClient.instance.get("questions");
      this.questions.value = plainToInstance(Question, await result.json());
    }
    this.questions.value.sort((a, b) => a.createdAt.getMilliseconds() - b.createdAt.getMilliseconds());
    return this.questions;
  }

  public async get(question: string | string[]): Promise<Question> {
    // const result = await ApiClient.instance.get(`questions/${question}`);
    // return plainToInstance(Question, result.data)[0];
    return this.questions.value.find((q) => q.id == +question) as Question;
  }

  public async addQuestion(title: string, text: string, tags: Tag[]) {
    let user = await UserService.instance.getCurrentUser();
    if (user == undefined) return;
    let id = this.questions.value.map((q) => q.id).reduce((p, c) => Math.max(p, c)) + 1;
    let question = new Question(id, user, title, text, new Date(), 0, tags, []);

    this.questions.value.unshift(question);
  }
}
