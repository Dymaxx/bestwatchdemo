import {
  getMovieByGenreAction,
  getMovieDetails,
  getMovieTrailer,
} from "@/actions/movie";
import getMovies, {
  getGenres,
  fetchPopulairMovies,
  fethchMovieDetails,
} from "@/db/Movies/Api/movies";
import { getMovieByGenre } from "@/db/Movies/Data/insert";
import {
  fetchPopulairTvShows,
  fetchUpcomingTvShows,
  getTvGenres,
} from "@/db/tv/api/tvShows";
import Image from "next/image";

export default async function home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={getMovies}>
        <button type="submit">Fetch movies</button>
      </form>
      <form action={fetchPopulairMovies}>
        <button type="submit">Fetch popular movies</button>
      </form>

      <form action={fetchPopulairTvShows}>
        <button type="submit">Fetch popular Tv shows</button>
      </form>
      <form action={fetchUpcomingTvShows}>
        <button type="submit">Fetch upcoming</button>
      </form>

      <form action={getGenres}>
        <button type="submit">Fetch Genres</button>
      </form>
      <form action={getTvGenres}>
        <button type="submit">Fetch Genres tv</button>
      </form>

      <form action={getMovieByGenreAction}>
        <button type="submit">Fetch by genre</button>
      </form>

      {/* <form action={getMovieDetails}>
        <input
          name='movieId'
          id='movieId'
          type='text'
          placeholder='movieId'
        />
        <button type='submit'>Get details</button>
      </form> */}
    </main>
  );
}
