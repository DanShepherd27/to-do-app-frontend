import { SyncData } from "@/app/models/SyncData";
import { User } from "@/app/models/User";
import axios from "axios";
import { UUID } from "crypto";

export async function postSyncData(syncData: SyncData) {
  if (process.env.BACKEND_URL) {
    try {
      const res = await axios.post(process.env.BACKEND_URL + "/sync", syncData);
    } catch {
      console.error("Sync failed.");
    }
  } else {
    throw Error("Backend URL not set.");
  }
}

export async function createUser(user: User) {
  if (process.env.BACKEND_URL) {
    try {
      await axios.post(process.env.BACKEND_URL + "/user", user);
    } catch {
      console.error("Couldn't create user.");
    }
  } else {
    throw Error("Backend URL not set.");
  }
}
export async function getUser(id: UUID) {
  if (process.env.BACKEND_URL) {
    try {
      const user = await axios.get(process.env.BACKEND_URL + "/user/id?=" + id);
      return user;
    } catch {
      throw Error("User not found.");
    }
  } else {
    throw Error("Backend URL not set.");
  }
}
