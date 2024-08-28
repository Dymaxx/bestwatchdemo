import { getTvShowTrailer } from "@/actions/movie";
import { db } from "@/db";
import { saveActor, saveTvCast } from "@/db/Actors/Data/actors";
import { createGenre } from "@/db/Movies/Data/insert";
import { actor, movie, tvCast, tvShow, tvShowGenre } from "@/db/schema";
import { log } from "console";
import { eq } from "drizzle-orm";
import { fetchTvCast } from "../api/tvShows";

export async function saveTvShow(data: any) {
  // Save the movie
  const newTvShow = await createTvShow(data);

  // If the TvShow already exists
  if (!newTvShow) {
    console.log("TvShow already exists");
    return false;
  }

  // Save the cast
  const cast = await fetchTvCast(data.id);

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
        await saveTvCast({
          tvShowId: newTvShow[0].id,
          actorId: actorId[0].actorId,
          character: api_actor.character,
          known_for_department: api_actor.known_for_department,
        });
      }

      // If the actor was new, use the new actor id that you got back from the database
      else {
        await saveTvCast({
          tvShowId: newTvShow[0].id,
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
      const newGenre = await createGenre([type.id, type.name]);

      // If the genre already exists
      // if (!newMovieGenre) {
      //   console.log("Genre already exists");

      //   const genreId = await db
      //     .select({ genreId: genre.id })
      //     .from(genre)
      //     .where(eq(genre.name, type.name));

      //   if (!genreId) {
      //     console.log("genre not found");
      //     return false;
      //   }

      //   // Save the movie and genre combination
      //   await saveMovieGenre(
      //     newMovie[0].id,
      //     genreId[0].genreId
      //   );
      //   // If the genre was new, use the new genre id that you got back from the database
      // } else {
      //   await saveMovieGenre(
      //     newMovie[0].id,
      //     newMovieGenre[0].id
      //   );
      // }
    });
  }
  // If data only has a array of genre ids
  if (data.genre_ids) {
    data.genre_ids.forEach(async (genre: number) => {
      const movieGenreCombination = await saveTvShowGenre(
        newTvShow[0].id,
        genre
      );
    });
  }

  // Save the trailer
  const trailer = await getTvShowTrailer(data.id);
  if (trailer) {
    const savedTrailer = await db
      .update(tvShow)
      .set({
        trailer: trailer.key,
      })
      .where(eq(tvShow.id, newTvShow[0].id))
      .returning();

    if (!savedTrailer) {
      console.log("trailer not found");
    }
  }
}

export async function getTvShowByName(tvShowName: string) {
  const decodedMovieName = decodeURIComponent(tvShowName);

  const TvShow = await db
    .select()
    .from(tvShow)
    .where(eq(tvShow.title, decodedMovieName));

  return TvShow[0];
}

export const getTvCast = async (movieId: number) => {
  const castMembers = await db
    .select({
      name: actor.name,
      image: actor.image,
      id: actor.id,
      imdb_id: actor.api_id,
      character: tvCast.character,
      known_for_department: tvCast.known_for_department,
      gender: actor.gender,
      movieId: tvCast.tvShowId,
    })
    .from(tvCast)
    .rightJoin(actor, eq(tvCast.actorId, actor.id))
    .where(eq(tvCast.tvShowId, movieId));

  return castMembers;
};

export async function saveTvShowGenre(tvShow_id: number, genre_id: number) {
  const newTvShowGenre = await db
    .insert(tvShowGenre)
    .values({
      tvShowId: tvShow_id,
      genreId: genre_id,
    })
    .onConflictDoNothing()
    .returning();
}

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
      api_id: data.id,
      imdb_id: data.imdb_id,
      first_air_date: data.first_air_date,
      overview: data.overview,
      poster_path: data.poster_path,
      status: data.status,
      director: data.director,
    })

    .onConflictDoNothing()
    .returning();

  if (newTvShow.length === 0) {
    console.log("movie already exists");
    return false;
  }
  return newTvShow;
}

export async function fetchTvShowTrailer(movieId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${movieId}/videos?api_key=0a012ded28de69faf32ed68a3c2944fd`
  );
  const data = await res.json();
  return data;
}
