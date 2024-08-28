import { eq } from "drizzle-orm";
import { db } from "..";
import { favoriteGenres } from "../schema";

export const selectFavoriteGenres = async (userId: number) => {
  const genres = await db
    .select()
    .from(favoriteGenres)
    .orderBy()
    .where(eq(favoriteGenres.userId, userId));
  return genres;
};
