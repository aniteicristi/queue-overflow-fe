import { Expose } from "class-transformer";
import "reflect-metadata";
export class Tag {
  constructor(identifier: string) {
    this.identifier = identifier;
  }

  @Expose()
  identifier: string;
}
