import { UserJSON } from "@clerk/nextjs/server";
import { User } from "../../types/user";

export async function filterUserData(data: UserJSON) {
  const newUser = {
    clerkId: data.id,
    userName: data.username,
    firstName: data.first_name,
    lastName: data.last_name,
    profilepic: data.image_url,
  };

  if (!newUser) {
    throw new Error("Failed to filter user data");
  }

  return newUser as User;
}
