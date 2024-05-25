import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";

export class Todo {
  id: UUID;
  userId: UUID;
  title: string;
  done: boolean;

  constructor(userId: UUID, title: string, done: boolean, id?: UUID) {
    this.userId = userId;
    this.title = title;
    this.done = done;
    this.id = id ?? (uuidv4() as UUID);
  }
}
