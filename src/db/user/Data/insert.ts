import { db } from "@/db";
import {
  favoriteGenres,
  likes,
  user,
  watchlist,
  watchlistItems,
} from "@/db/schema";
import { eq, InferInsertModel } from "drizzle-orm";
import { favGenres } from "../../../../types/user";
import { loadEnvFile } from "process";
import { log } from "console";
import { el } from "@faker-js/faker";
export async function insertUser(data: InferInsertModel<typeof user>) {
  const newUser = await db
    .insert(user)
    .values(data)
    .onConflictDoNothing()
    .returning();

  return newUser;
}

// Favorite Genres
export async function insertFavoriteGenres(
  genres: favGenres[],
  userId: number
) {
  const dataToInsert = genres.map((genre) => ({
    userId,
    genreId: genre.api_id,
  }));

  if (dataToInsert.length === 0) log("no data to insert");
  const newFavoriteGenres = await db
    .insert(favoriteGenres)
    .values(dataToInsert)
    .onConflictDoNothing()
    .returning();

  return newFavoriteGenres;
}

// Liking shows
export async function inserLikedShow(
  showId: number,
  userId: number,
  mediaType: "movie" | "tvShow"
) {
  const newLike = await db
    .insert(likes)
    .values({ userId, media_id: showId, media_type: mediaType })
    .onConflictDoNothing()
    .returning();

  if (newLike.length === 0) return false;
  else {
    return true;
  }
}

// // Creating new WatchList
export async function insertWatchList(
  name: string,
  userId: number,
  image: string
) {
  const newWatchList = await db
    .insert(watchlist)
    .values({ name, userId, image })
    .onConflictDoNothing()
    .returning();

  return newWatchList;
}

export async function insertWatchListItem(
  watchlistId: number,
  showId: number,
  mediaType: string
) {
  const newWatchListItem = await db
    .insert(watchlistItems)
    .values({
      watchlist_id: watchlistId,
      media_id: showId,
      media_type: mediaType,
    })
    .onConflictDoNothing()
    .returning();

  return newWatchListItem;
}
