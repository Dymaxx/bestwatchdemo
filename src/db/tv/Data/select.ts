"use server";
import { db } from "@/db";
import { genre, movie, tvShow, tvShowGenre } from "@/db/schema";
import { eq, ilike, gte, inArray } from "drizzle-orm";
export async function selectAllTvShowsByGenre(categoryId: number) {
  const tvShows = await db
    .select({
      tvShow,
    })
    .from(tvShowGenre)
    .where(eq(tvShowGenre.genreId, categoryId))
    .rightJoin(tvShow, eq(tvShow.id, tvShowGenre.tvShowId))
    .orderBy(tvShow.id);

  const result = tvShows.map((tvItem) => ({
    tvShow: tvItem.tvShow,
  }));
  return tvShows;
}

export async function selectAllTvGenres() {
  const genres = await db.select().from(genre).orderBy(genre.api_id);
  return genres;
}

export async function selectAllTvShowsFilteredByGenre() {
  const tvShowsPerGenre = await db
    .select({
      genre: genre.name,
      apiId: genre.api_id,
      tvSHowId: tvShowGenre.tvShowId,
      tvShowObject: tvShow,
    })
    .from(genre)
    .rightJoin(tvShowGenre, eq(tvShowGenre.genreId, genre.api_id))
    .rightJoin(tvShow, eq(tvShow.id, tvShowGenre.tvShowId));

  const genreMap = new Map();

  tvShowsPerGenre.forEach((tvShow) => {
    if (!genreMap.has(tvShow.genre)) {
      genreMap.set(tvShow.genre, {
        genre: tvShow.genre,
        apiId: tvShow.apiId,
        tvShows: [],
      });
    }
    genreMap.get(tvShow.genre).tvShows.push(tvShow.tvShowObject);
  });

  return Array.from(genreMap.values());
}

export async function selectTvShowsByName(title: string) {
  const tvShows = await db
    .select()
    .from(tvShow)
    .where(ilike(tvShow.title, `%${title}%`));
  return tvShows;
}

export const selectTvShowsByReleaseDate = async () => {
  const today = new Date();
  const date = today.toISOString().slice(0, 10);
  const tvShows = await db
    .select()
    .from(tvShow)
    .where(gte(tvShow.first_air_date, date))
    .orderBy(tvShow.first_air_date);
  return tvShows;
};

export const selectTvShowsByReleaseDateAndGenre = async () => {
  const today = new Date();
  const date = today.toISOString().slice(0, 10);
  const tvShows = await db
    .select()
    .from(tvShow)
    .where(gte(tvShow.first_air_date, date))
    .orderBy(tvShow.first_air_date);
  return tvShows;
};

export async function selectAllTvShowsByCategory(categoryId: number[]) {
  if (categoryId.length === 0) {
    return null;
  }
  const tvShows = await db
    .select({
      tv: tvShow,
    })
    .from(tvShowGenre)
    .where(inArray(tvShowGenre.genreId, categoryId))
    .rightJoin(tvShow, eq(tvShow.id, tvShowGenre.tvShowId))
    .orderBy(tvShow.id);

  // Transform the rawMovies array into the desired format
  const formatMovies = tvShows.map((tvShow) => {
    return { ...tvShow.tv };
  });

  return formatMovies;
}
