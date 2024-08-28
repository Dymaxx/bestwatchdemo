import { and, eq } from "drizzle-orm";
import { db } from "..";
import { watchlist, watchlistItems } from "../schema";
import { log } from "console";

export async function deleteWatchListItemById(
  watchListId: number,
  mediaType: string,
  mediaId: number
) {
  const watchList = await db
    .delete(watchlistItems)
    .where(
      and(
        eq(watchlistItems.watchlist_id, watchListId),
        eq(watchlistItems.media_type, mediaType),
        eq(watchlistItems.media_id, mediaId)
      )
    );
  return watchList;
}
