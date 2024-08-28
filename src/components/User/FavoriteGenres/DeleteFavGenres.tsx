import { db } from "@/db";
import { favoriteGenres } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function deleteFavGenres(userId: number) {
  const deleteGenres = await db
    .delete(favoriteGenres)
    .where(eq(favoriteGenres.userId, userId))
    .returning();

  return deleteGenres;
}
