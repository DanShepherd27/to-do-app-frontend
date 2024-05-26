import { Todo } from "@/app/models/Todo";
import { User } from "@/app/models/User";
import axios, { AxiosResponse } from "axios";
import { UUID } from "crypto";

// TODO ENDPOINTS

export async function syncTodos(
  changed: Todo[],
  removed: Todo[]
): Promise<void> {
  if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    throw Error("Backend URL not set.");
  }

  try {
    const response: AxiosResponse<void> = await axios.post(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/todo",
      { changed, removed }
    );

    if (response.status !== 200) {
      throw new Error("Request failed. Status code: " + response.status);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Network error.");
    } else {
      throw new Error("Unexpected error");
    }
  }
}

export async function getTodos(userId: UUID): Promise<Todo[]> {
  if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    throw Error("Backend URL not set.");
  }

  try {
    const response: AxiosResponse<Todo[]> = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/todo?userId=" + userId
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Network error.");
    } else {
      throw new Error("Unexpected error");
    }
  }
}

// USER ENDPOINTS

export async function createOrUpdateUser(user: User): Promise<void> {
  if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    throw Error("Backend URL not set.");
  }

  try {
    const response: AxiosResponse<void> = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/user`,
      user
    );

    if (response.status !== 200) {
      throw new Error("Request failed. Status code: " + response.status);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Network error.");
    } else {
      throw new Error("Unexpected error");
    }
  }
}

export async function getUser(id: UUID): Promise<User> {
  if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
    throw Error("Backend URL not set.");
  }

  try {
    const response: AxiosResponse<User> = await axios.get(
      process.env.NEXT_PUBLIC_BACKEND_URL + "/user?id=" + id
    );
    if (response.status !== 200) {
      throw new Error("Request failed. Status code: " + response.status);
    }
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error("Network error.");
    } else {
      throw new Error("Unexpected error");
    }
  }
}
