import { and, eq } from "drizzle-orm";
import { db } from "..";
import { movie, tvShow, watchlist, watchlistItems } from "../schema";
import { log } from "console";

export async function selectWatchlistByName(userId: number, name: string) {
  const selectedWatchlist = await db
    .select()
    .from(watchlist)
    .where(eq(watchlist.name, name))
    .limit(1);

  if (selectedWatchlist !== null) {
    async function getWatchListByMediaType(mediaType: string) {
      const mediaTable = mediaType === "movie" ? movie : tvShow;

      const watchListItems = await db
        .select({
          media: mediaTable,
        })
        .from(watchlistItems)
        .where(
          and(
            eq(watchlistItems.watchlist_id, selectedWatchlist[0].id),
            eq(watchlistItems.media_type, mediaType)
          )
        )
        .leftJoin(watchlist, eq(watchlist.id, watchlistItems.watchlist_id))
        .rightJoin(mediaTable, eq(mediaTable.id, watchlistItems.media_id));
      return watchListItems;
    }

    const showItems = {
      movies: [
        ...Object.values(
          (await getWatchListByMediaType("movie")).map((m) => m.media)
        ),
      ],
      tvShows: [
        ...Object.values(
          (await getWatchListByMediaType("tvShow")).map((m) => m.media)
        ),
      ],
    };

    return showItems;
  } else {
    return false;
  }
}

export async function selectWatchListByName(userId: number, name: string) {
  const selectedWatchlist = await db
    .select()
    .from(watchlist)
    .where(and(eq(watchlist.name, name), eq(watchlist.userId, userId)))
    .limit(1);

  return selectedWatchlist[0];
}
