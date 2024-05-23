import { create } from "zustand";
import { Todo } from "../models/Todo";
import { UUID } from "crypto";
import { v4 as uuidv4 } from "uuid";
import * as api from "../../api/api";
import { SyncData } from "../models/SyncData";
import { User } from "../models/User";

export type TodosStore = {
  todos: Array<Todo>;
  fetchTodos: (userId: UUID) => Promise<void>;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: UUID) => void;
};

export const useTodosStore = create<TodosStore>((set, get) => ({
  todos: [],
  fetchTodos: async (userId: UUID) => {
    try {
      await api.getSyncData(userId);
      set({
        todos: [],
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
}));
