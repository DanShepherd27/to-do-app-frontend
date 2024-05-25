import { SyncData } from "@/app/models/SyncData";
import { User } from "@/app/models/User";
import axios from "axios";
import { UUID } from "crypto";
import { cookies } from "next/headers";

export async function postSyncData(syncData: SyncData) {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    try {
      const res = await axios.post(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/sync",
        syncData
      );
    } catch (e: any) {
      console.error("Sync failed." + e.message);
    }
  } else {
    throw Error("Backend URL not set.");
  }
}

export async function getSyncData(userId: UUID) {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    try {
      const res = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/sync/" + userId
      );
      return res;
    } catch (e: any) {
      console.error("Fetching failed." + e.message);
    }
  } else {
    throw Error("Backend URL not set.");
  }
}

export async function createUser(user: User) {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    try {
      await axios.post(process.env.NEXT_PUBLIC_BACKEND_URL + "/user", user);
    } catch {
      console.error("Couldn't create user.");
    }
  } else {
    throw Error("Backend URL not set.");
  }
}
export async function getUser(id: UUID) {
  if (process.env.NEXT_PUBLIC_BACKEND_URL) {
    try {
      const user = await axios.get(
        process.env.NEXT_PUBLIC_BACKEND_URL + "/user/id?=" + id
      );
      return user;
    } catch {
      throw Error("User not found.");
    }
  } else {
    throw Error("Backend URL not set.");
  }
}
