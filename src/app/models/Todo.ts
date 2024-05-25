import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { User } from "./User";

export class Todo {
  id: UUID;
  user: User;
  title: string;
  done: boolean;

  constructor(user: User, title: string, done: boolean, id?: UUID) {
    this.user = user;
    this.title = title;
    this.done = done;
    this.id = id ?? (uuidv4() as UUID);
  }
}
