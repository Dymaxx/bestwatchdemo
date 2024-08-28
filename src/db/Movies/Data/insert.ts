"use server";
import { eq } from "drizzle-orm";
import { db } from "../..";
import {
  actor,
  cast,
  genre,
  movie,
  movieGenre,
  tvShow,
  tvShowGenre,
} from "../../schema";
import { fetchCast } from "../Api/movies";
import { log } from "console";
import { saveActor, saveCast, saveTvCast } from "@/db/Actors/Data/actors";
import { getMovieTrailer, getTvShowTrailer } from "@/actions/movie";

export async function createMovie(data: {
  id: number;
  imdb_id: string;
  title: string;
  overview: string;
  poster_path: string;
  status: string;
  release_date: string;
  director: string;
  runtime: number;
  budget: number;
}) {
  const newMovie = await db
    .insert(movie)
    .values({
      api_id: data.id,
      imdb_id: data.imdb_id,
      title: data.title,
      release_date: data.release_date,
      overview: data.overview,
      poster_path: data.poster_path,
      status: data.status,
      director: data.director,
      runtime: data.runtime,
      budget: data.budget,
    })
    .onConflictDoNothing()
    .returning();

  if (newMovie.length === 0) {
    console.log("movie already exists");
    return false;
  }
  return newMovie;
}

export async function saveMovieGenre(movie_id: number, genre_id: number) {
  const newMovieGenre = await db
    .insert(movieGenre)
    .values({
      movieId: movie_id,
      genreId: genre_id,
    })
    .onConflictDoNothing()
    .returning();
}

export async function createGenre(category: [id: number, name: string]) {
  const newCategory = await db
    .insert(genre)
    .values({
      api_id: category[0],
      name: category[1],
    })
    .onConflictDoNothing()
    .returning();

  if (newCategory.length === 0) {
    return false;
  }

  return newCategory;
}

export async function saveMovie(data: any) {
  // Save the movie
  const newMovie = await createMovie(data);

  // If the movie already exists
  if (!newMovie) {
    console.log("movie already exists");
    return false;
  }

  // Save the cast
  const cast = await fetchCast(data.id);

  if (!cast) {
    console.log("cast not found");
    return false;
  } else {
    cast.forEach(async (api_actor: any) => {
      const newActor = await saveActor(api_actor);

      if (!newActor) {
        // Search actor in database
        const actorId = await db
          .select({
            actorId: actor.id,
            name: actor.name,
          })
          .from(actor)
          .where(eq(actor.api_id, api_actor.id));
        if (!actorId) {
          console.log("actor not found");
          return false;
        }

        // Save the movie and actor combination
        await saveCast({
          movieId: newMovie[0].id,
          actorId: actorId[0].actorId,
          character: api_actor.character,
          known_for_department: api_actor.known_for_department,
        });
      }

      // If the actor was new, use the new actor id that you got back from the database
      else {
        await saveCast({
          movieId: newMovie[0].id,
          actorId: newActor[0].id,
          character: api_actor.character,
          known_for_department: api_actor.known_for_department,
        });
      }
    });
  }

  // Save the genres

  if (data.genres) {
    data.genres.forEach(async (type: { id: any; name: string }) => {
      const newMovieGenre = await createGenre([type.id, type.name]);

      // If the genre already exists
      if (!newMovieGenre) {
        console.log("Genre already exists");

        const genreId = await db
          .select({ genreId: genre.id })
          .from(genre)
          .where(eq(genre.name, type.name));

        if (!genreId) {
          console.log("genre not found");
          return false;
        }

        // Save the movie and genre combination
        await saveMovieGenre(newMovie[0].id, genreId[0].genreId);
        // If the genre was new, use the new genre id that you got back from the database
      } else {
        await saveMovieGenre(newMovie[0].id, newMovieGenre[0].id);
      }
    });
  }
  // If data only has a array of genre ids
  if (data.genre_ids) {
    data.genre_ids.forEach(async (genre: number) => {
      const movieGenreCombination = await saveMovieGenre(newMovie[0].id, genre);
    });
  }

  // Save the trailer
  const trailer = await getMovieTrailer(data.id);
  if (trailer) {
    const savedTrailer = await db
      .update(movie)
      .set({
        trailer: trailer.key,
      })
      .where(eq(movie.id, newMovie[0].id))
      .returning();

    if (!savedTrailer) {
      console.log("trailer not found");
    }
  }
}

export const getMovies = async () => {
  const movies = await db.select().from(movie);
  return movies;
};

export const getMovieByGenre = async (genreId: number) => {
  const movies = await db
    .select()
    .from(movieGenre)
    .where(eq(movieGenre.movieId, genreId));

  if (movies.length === 0) {
    return false;
  }

  return true;
};

export async function getMovieByName(movieName: string) {
  const decodedMovieName = decodeURIComponent(movieName);

  const movies = await db
    .select()
    .from(movie)
    .where(eq(movie.title, decodedMovieName));
  return movies[0];
}

export const getCastMembers = async (movieId: number) => {
  const castMembers = await db
    .select({
      name: actor.name,
      image: actor.image,
      id: actor.id,
      imdb_id: actor.api_id,
      character: cast.character,
      known_for_department: cast.known_for_department,
      gender: actor.gender,
      movieId: cast.movieId,
    })
    .from(cast)
    .rightJoin(actor, eq(cast.actorId, actor.id))
    .where(eq(cast.movieId, movieId));

  return castMembers;
};
