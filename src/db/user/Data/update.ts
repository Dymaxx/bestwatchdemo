import { db } from "@/db";
import { user } from "@/db/schema";
import { eq, InferInsertModel } from "drizzle-orm";
import { edditedUserType } from "../../../../types/user";

export async function edditUser(
  userId: number,
  data: Partial<InferInsertModel<typeof user>>
) {
  try {
    const updatedUser = await db
      .update(user)
      .set(data)
      .where(eq(user.id, userId))
      .returning();

    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
}
