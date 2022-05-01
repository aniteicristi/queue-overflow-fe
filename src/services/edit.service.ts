import { ref, Ref } from "vue";
import { Answer } from "../models/Answer.model";
import { Question } from "../models/Question.model";

export class EditService {
  private static _instance: EditService | null;

  public static get instance() {
    if (EditService._instance == null) {
      EditService._instance = new EditService();
      return EditService._instance;
    } else return EditService._instance;
  }

  private constructor() {}

  public answer: Ref<Answer | null> = ref(null);

  public question: Ref<Question | null> = ref(null);
}
