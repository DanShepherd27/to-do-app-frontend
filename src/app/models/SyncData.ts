import { Todo } from "./Todo";
import { User } from "./User";

export class SyncData {
  user: User;
  todos: Todo[];

  constructor(user: User, todos: Todo[]) {
    this.user = user;
    this.todos = todos;
  }
}
