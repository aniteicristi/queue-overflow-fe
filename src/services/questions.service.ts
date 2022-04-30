import { plainToInstance } from "class-transformer";
import { ref, Ref } from "vue";
import { Endpoints } from "../helpers/ endpoints";
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
      const result = await ApiClient.instance.get(Endpoints.getQuestions);
      this.questions.value = plainToInstance(Question, await result.data);
    }
    this.questions.value.sort((a, b) => a.createdAt.getMilliseconds() - b.createdAt.getMilliseconds());
    return this.questions;
  }

  public async get(question: string | string[]): Promise<Question | null> {
    const result = await ApiClient.instance.get(`${Endpoints.getQuestions}/${question}`);
    if (result.status == 200) {
      return plainToInstance(Question, [result.data])[0];
    }
    return null;
  }

  public async addQuestion(title: string, text: string, tags: Tag[]) {
    const response = await ApiClient.instance.post(Endpoints.postQuestion, {
      title: title,
      text: text,
      tags: tags.map((tag) => tag.identifier),
    });
    if (response.status == 201) {
      const newQuestion: Question = plainToInstance(Question, [response.data])[0];

      this.questions.value.unshift(newQuestion);
    }
  }

  public async addAnswer(id: number, text: string): Promise<Answer | null> {
    const response = await ApiClient.instance.post(Endpoints.postAnswer, {
      question: id,
      text: text,
    });
    if (response.status == 201) {
      const newAnswer: Answer = plainToInstance(Answer, [response.data])[0];
      return newAnswer;
    }
    return null;
  }
  public async voteQuestion(id: number, value: number): Promise<boolean> {
    const response = await ApiClient.instance.post(Endpoints.voteQuestion, {
      questionId: id,
      amount: value,
    });
    if (response.status != 201) {
      //show error
      return false;
    }
    return true;
  }
  public async voteAnswer(id: number, value: number): Promise<boolean> {
    const response = await ApiClient.instance.post(Endpoints.voteAnswer, {
      answerId: id,
      amount: value,
    });
    if (response.status != 201) {
      //show error
      return false;
    }
    return true;
  }

  public async findVoteQuestion(id: number) {
    const currentUSer = await UserService.instance.getCurrentUser();
    const response = await ApiClient.instance.get(`${Endpoints.getVoteStatusQuestion}/?question=${id}&user=${currentUSer?.id}`);
    if (response.status == 200) {
      return response.data.isLiked;
    } else {
      return null;
    }
  }
  public async findVoteAnswer(id: number) {
    const currentUSer = await UserService.instance.getCurrentUser();
    const response = await ApiClient.instance.get(`${Endpoints.getVoteStatusAnswer}/?answer=${id}&user=${currentUSer?.id}`);
    if (response.status == 200) {
      return response.data.isLiked;
    } else {
      return null;
    }
  }
}
