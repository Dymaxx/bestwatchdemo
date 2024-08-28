import { db } from "@/db";
import {
  favoriteGenres,
  genre,
  likes,
  user,
  watchlist,
  watchlistItems,
} from "@/db/schema";
import { log } from "console";
import { and, eq, inArray, like } from "drizzle-orm";
import { pgEnum } from "drizzle-orm/pg-core";

export async function selectUserByUserName({ username }: { username: string }) {
  const userData = await db
    .select()
    .from(user)
    .where(eq(user.userName, username))
    .limit(1);
  return userData[0];
}

export async function selectUserByClerkId({ clerkId }: { clerkId: string }) {
  const userData = await db
    .select()
    .from(user)
    .where(eq(user.clerkId, clerkId))
    .limit(1);
  return userData[0];
}

export async function selectFavoritesGenresByUserId({ id }: { id: number }) {
  const selectedGenres = await db
    .select({ name: genre.name, id: genre.id, api_id: genre.api_id })
    .from(favoriteGenres)
    .where(eq(favoriteGenres.userId, id))
    .innerJoin(genre, eq(favoriteGenres.genreId, genre.api_id))
    .innerJoin(user, eq(favoriteGenres.userId, user.id));

  const favGenres: { name: string; id: number; api_id: number }[] =
    selectedGenres.map((genre) => ({
      name: genre.name,
      id: genre.id,
      api_id: genre.api_id,
    }));

  return favGenres;
}

export async function selectAllGenres() {
  const genres = await db.select().from(genre).orderBy(genre.id);
  return genres;
}

export async function isShowLiked(id: number, type: string) {
  const isLiked = await db
    .select()
    .from(likes)
    .where(and(eq(likes.media_id, id), eq(likes.media_type, type)));

  if (isLiked.length > 0) {
    return true;
  } else {
    return false;
  }
}

export async function selectWatchlistByUserId(userId: number) {
  const usersWatchlist = await db
    .select()
    .from(watchlist)
    .where(eq(watchlist.userId, userId));
  return usersWatchlist;
}

export async function fetchIsShowInWatchList(
  showId: number,
  mediaType: string
) {
  try {
    const isInWatchList = await db
      .select()
      .from(watchlistItems)
      .where(
        and(
          eq(watchlistItems.media_type, mediaType),
          eq(watchlistItems.media_id, showId)
        )
      );
    if (isInWatchList.length > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error: Error | any) {
    log(error);
    throw new Error("Error fetching show from watchlist:", error);
  }
}

//
