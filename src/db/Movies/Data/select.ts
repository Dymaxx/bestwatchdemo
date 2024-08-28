"use server";
import { db } from "@/db";
import { genre, movieGenre, tvShow } from "../../schema";
import {
  and,
  eq,
  inArray,
  InferSelectModel,
  isNotNull,
  ne,
  not,
} from "drizzle-orm";
import { movie } from "@/db/schema";
import { RecommendedMovieProps } from "../../../../types/movies";
import { ilike, like, gte } from "drizzle-orm";
import { notEqual } from "assert";
import { log } from "console";

export async function createTvShow(data: {
  id: number;
  imdb_id: string;
  name: string;
  overview: string;
  poster_path: string;
  first_air_date: string;
  status: string;
  director: string;
  runtime: number;
  budget: number;
}) {
  const newTvShow = await db
    .insert(tvShow)
    .values({
      title: data.name,
      overview: data.overview,
      poster_path: data.poster_path,
      first_air_date: data.first_air_date,
      status: data.status,
      director: data.director,
      api_id: data.id,
      imdb_id: data.imdb_id,
    })

    .onConflictDoNothing()
    .returning();

  if (newTvShow.length === 0) {
    console.log("movie already exists");
    return false;
  }
  return newTvShow;
}

export async function selectMoviesByGenre(genreId: number) {
  const movies = await db
    .select()
    .from(movieGenre)
    .where(eq(movieGenre.genreId, genreId))
    .innerJoin(movie, eq(movie.id, movieGenre.movieId))
    .orderBy(movie.id);
  return movies;
}
export async function selectAllMoviesByCategory(categoryId: number[]) {
  if (categoryId.length === 0) {
    return null;
  }
  const moviess = await db
    .select({
      movie: movie,
    })
    .from(movieGenre)
    .where(inArray(movieGenre.genreId, categoryId))
    .rightJoin(movie, eq(movie.id, movieGenre.movieId))
    .orderBy(movie.id);

  // Transform the rawMovies array into the desired format
  const formatMovies = moviess.map((movie) => {
    return { ...movie.movie };
  });

  return formatMovies;
  // const rawMovies: {
  //   movie: RecommendedMovieProps;
  //   genres: number[];
  // }[] = [];

  // // Create a new object with the movie and the genres
  // movies.forEach(({ movie, movieGenre }) => {
  //   if (!rawMovies[movie.id]) {
  //     rawMovies[movie.id] = { movie, genres: [] };
  //   }
  //   if (movieGenre.genreId) {
  //     rawMovies[movie.id].genres.push(movie.id);
  //   }
  // });

  // // Convert the object into an array
  // const movieMap = Object.values(rawMovies);
  // // Sort the array by the amount of genres
  // const orderdByAmountOfGenres = movieMap.sort(
  //   (a, b) => b.genres.length - a.genres.length
  // );
  // return orderdByAmountOfGenres;
}

export async function selectAllMovieGenres() {
  const genres = await db.select().from(genre).orderBy(genre.id);
  return genres;
}

export const getPopularMovies = async () => {
  const movies = await db.select().from(movie).limit(4);
  const moviesToReturn = movies.map((movie) => {
    return {
      movie: movie,
    };
  });
  return moviesToReturn;
};

export async function selectAllMoviesFilteredByGenre() {
  const moviesPerGenre = await db
    .select({
      genre: genre.name,
      apiId: genre.api_id,
      movieId: movieGenre.movieId,
      movieObject: movie,
    })
    .from(genre)
    .rightJoin(movieGenre, eq(movieGenre.genreId, genre.api_id))
    .rightJoin(movie, eq(movie.id, movieGenre.movieId))
    .where(
      and(not(like(movie.release_date, "2025")), isNotNull(movie.release_date))
    );

  const genreMap = new Map();

  moviesPerGenre.forEach((movie) => {
    if (!genreMap.has(movie.genre)) {
      genreMap.set(movie.genre, {
        genre: movie.genre,
        apiId: movie.apiId,
        movies: [],
      });
    }
    genreMap.get(movie.genre).movies.push(movie.movieObject);
  });

  return Array.from(genreMap.values());
}

export async function selectMoviesByName(name: string) {
  const movies = await db
    .select()
    .from(movie)
    .where(ilike(movie.title, `%${name}%`));
  return movies;
}

export const selectMoviesByReleaseDate = async () => {
  const today = new Date();
  const date = today.toISOString().slice(0, 10);
  const movies = await db
    .select()
    .from(movie)
    .where(gte(movie.release_date, date));
  return movies;
};

export const selectMoviesByReleaseDateAndGenre = async () => {
  const today = new Date();
  const date = today.toISOString().slice(0, 10);
  const movies = await db
    .select()
    .from(movie)
    .where(gte(movie.release_date, date));
  return movies;
};
