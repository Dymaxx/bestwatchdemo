"use server";
import { selectUserByClerkId } from "@/db/user/Data/select";
import { auth } from "@clerk/nextjs/server";
import { log } from "console";

export async function fetchUserData() {
  const clerkId = auth().userId as string;
  const userData = await selectUserByClerkId({ clerkId });
  return userData;
}

export async function fetchUserId() {
  const user = await fetchUserData();
  const userId = user.id;

  return userId;
}
