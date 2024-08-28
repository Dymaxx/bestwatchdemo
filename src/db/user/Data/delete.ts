import { db } from "@/db";
import { likes } from "@/db/schema";
import { and, eq } from "drizzle-orm";

export async function deleteLikedShow(
  userId: number,
  showId: number,
  mediaType: "movie" | "tvShow"
) {
  const deletedLike = await db
    .delete(likes)
    .where(
      and(
        eq(likes.userId, userId),
        eq(likes.media_id, showId),
        eq(likes.media_type, mediaType)
      )
    )
    .returning();
  return deletedLike;
}
