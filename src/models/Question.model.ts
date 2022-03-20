export class Question {
  constructor(id: number, title: string, text: string) {
    this.id = id;
    this.title = title;
    this.text = text;
  }

  id: number;

  title: string;

  text: string;
}
