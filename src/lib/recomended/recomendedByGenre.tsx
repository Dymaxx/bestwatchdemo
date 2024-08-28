import { selectAllMoviesByCategory } from "@/db/Movies/Data/select";
import { favoriteGenres } from "@/db/schema";
import {
  selectAllTvShowsByCategory,
  selectAllTvShowsByGenre,
} from "@/db/tv/Data/select";
import { selectFavoritesGenresByUserId } from "@/db/user/Data/select";
import { auth } from "@clerk/nextjs/server";
import { log } from "console";
import { loadEnvFile } from "process";

export async function recomendShows(userId: number) {
  //Get the user's favorite genres from the database
  const favGenres = await selectFavoritesGenresByUserId({ id: userId });
  const favGenresId: number[] = favGenres.map(
    (genre: { api_id: number }) => genre.api_id
  );
  // get all the movies that match the user's favorite genres orderd by amount of common genres
  const selectedMovies = await selectAllMoviesByCategory(favGenresId);
  const selectedTvShows = await selectAllTvShowsByCategory(favGenresId);

  if (selectedMovies == null || selectedTvShows == null) {
    return null;
  } else {
    const recomendedShows = {
      movies: [...selectedMovies],
      tvShows: [...selectedTvShows],
    };

    return recomendedShows;
  }
}
