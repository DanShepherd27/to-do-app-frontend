import { create } from "zustand";
import { Todo } from "../models/Todo";
import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import * as api from "../../api/api";
import { SyncData } from "../models/SyncData";
import { User } from "../models/User";

export type TodosStore = {
  todos: Array<Todo>;
  fetchTodos: () => Promise<void>;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: UUID) => void;
  syncTodos: () => void;
};

export const useTodosStore = create<TodosStore>((set, get) => ({
  todos: [],
  fetchTodos: async () => {
    try {
      set({
        todos: /**/ [
          new Todo(uuidv4() as UUID, "mosogatás", false),
          new Todo(uuidv4() as UUID, "takarítás", false),
          new Todo(uuidv4() as UUID, "bevásárlás", false),
          new Todo(uuidv4() as UUID, "evés", false),
          new Todo(uuidv4() as UUID, "ivás", false),
          new Todo(uuidv4() as UUID, "autószerelés", false),
          new Todo(uuidv4() as UUID, "házi feladat", true),
          new Todo(uuidv4() as UUID, "olvasás", true),
          new Todo(uuidv4() as UUID, "5km futás", true),
          new Todo(uuidv4() as UUID, "vasalás", true),
        ],
      });
    } catch (e) {
      console.error("Failed to fetch todos." + e);
    }
  },
  addTodo: (todo: Todo) => {
    try {
      set({
        todos: [...get().todos, todo],
      });
    } catch {
      console.error("Failed to add todo.");
    }
  },
  updateTodo: (todo: Todo) => {
    try {
      set({
        todos: [...get().todos.filter((x) => x.id !== todo.id), todo],
      });
    } catch {
      console.error("Failed to update todo.");
    }
  },
  deleteTodo: (id: UUID) => {
    try {
      set({
        todos: get().todos.filter((x) => x.id !== id),
      });
    } catch {
      console.error("Failed to delete todo.");
    }
  },
  syncTodos: () => {
    try {
      // FIXME: get user from cookies
      const user = new User("");
      const syncData = new SyncData(user, get().todos);
      api.postSyncData(syncData);
    } catch {
      console.error("Failed to sync todos.");
    }
  },
}));
