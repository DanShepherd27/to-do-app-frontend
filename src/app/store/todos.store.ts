import { create } from "zustand";
import { Todo } from "../models/Todo";
import { UUID } from "crypto";
import * as api from "../../api/api";

export type TodosStore = {
  todos: Array<Todo>;
  softDeletedTodos: Array<Todo>;
  fetchTodos: (userId: UUID) => Promise<void>;
  addTodo: (todo: Todo) => void;
  updateTodo: (todo: Todo) => void;
  deleteTodo: (id: UUID) => void;
  softDeleteTodo: (todo: Todo) => void;
  resetSoftDeleteTodos: () => void;
};

export const useTodosStore = create<TodosStore>((set, get) => ({
  todos: [],
  softDeletedTodos: [],
  fetchTodos: async (userId: UUID) => {
    try {
      const todos = await api.getTodos(userId);
      set({
        todos,
      });
    } catch (e) {
      throw e;
    }
  },
  addTodo: (todo: Todo) => {
    try {
      const incremented = get().todos.map((item) => {
        return { ...item, index: item.index++ };
      });
      set({
        todos: [...incremented, todo],
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
      const todo = get().todos.find((t) => t.id === id)!;
      const decremented = get().todos.map((item) => {
        return item.index > todo.index
          ? { ...item, index: item.index-- }
          : item;
      });
      set({
        todos: decremented.filter((x) => x.id !== id),
      });
    } catch {
      console.error("Failed to delete todo.");
    }
  },
  softDeleteTodo: (todo: Todo) => {
    try {
      const decremented = get().todos.map((item) => {
        return item.index > todo.index
          ? { ...item, index: item.index-- }
          : item;
      });
      set({
        softDeletedTodos: [...get().softDeletedTodos, todo],
        todos: decremented.filter((x) => x.id !== todo.id),
      });
    } catch {
      console.error("Failed to soft delete todo.");
    }
  },
  resetSoftDeleteTodos: () => {
    set({
      softDeletedTodos: [],
    });
  },
}));
