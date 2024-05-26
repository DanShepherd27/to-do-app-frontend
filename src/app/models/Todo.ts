import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import { User } from "./User";

export class Todo {
  id: UUID;
  user: User;
  title: string;
  done: boolean;
  index: number;

  constructor(
    user: User,
    title: string,
    done: boolean,
    index: number,
    id?: UUID
  ) {
    this.user = user;
    this.title = title;
    this.done = done;
    this.index = index;
    this.id = id ?? (uuidv4() as UUID);
  }
}
