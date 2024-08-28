import { eq } from "drizzle-orm";
import { watchlist } from "../schema";
import { db } from "..";

export async function updateWatchList(
  name: string,
  watchListId: number,
  description: string,
  image: string
) {
  const watchList = await db
    .update(watchlist)
    .set({ name, image, description })
    .where(eq(watchlist.id, watchListId))
    .returning();
  return watchList;
}
