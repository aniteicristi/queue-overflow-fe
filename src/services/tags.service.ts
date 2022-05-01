import { plainToInstance } from "class-transformer";
import { ref, Ref } from "vue";
import { Endpoints } from "../helpers/ endpoints";
import { Tag } from "../models/Tag.model";
import { ApiClient } from "./api.client";

export class TagsService {
  private static _instance: TagsService | null;

  public static get instance() {
    if (TagsService._instance == null) {
      TagsService._instance = new TagsService();
      return TagsService._instance;
    } else return TagsService._instance;
  }

  private constructor() {
    this.tags = ref<Tag[]>([]);
  }

  public static reset() {
    this._instance = null;
  }

  public tags: Ref<Tag[]>;

  public async getAll(): Promise<Ref<Tag[]>> {
    if (this.tags.value.length == 0) {
      const result = await ApiClient.instance.get(Endpoints.getTags);
      this.tags.value = plainToInstance(Tag, result.data);
    }
    return this.tags;
  }
}
