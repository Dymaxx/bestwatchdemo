"use server";

import { createGenre, saveMovie } from "@/db/Movies/Data/insert";
import { da } from "@faker-js/faker";
import { log } from "console";

// Get popilar movies
export async function fetchPopulairMovies() {
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/movie/week?api_key=0a012ded28de69faf32ed68a3c2944fd&language=en-US&page=3"
  );
  const data = await res.json();
  data.results.map(async (movie: any) => {
    const newMovie = await saveMovie(movie);
  });
  return data;
}

export async function fetchUpcomingMovies() {
  const res = await fetch(
    "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={2025-01-01}&release_date.lte={2025-09-04}&api_key=0a012ded28de69faf32ed68a3c2944fd"
  );
  const data = await res.json();
  data.results.map(async (movie: any) => {
    const newMovie = await saveMovie(movie);
  });
  return data;
}

export default async function getMovies() {
  const res = await fetch(
    "https://api.themoviedb.org/3/movie/1011985?api_key=0a012ded28de69faf32ed68a3c2944fd&page=3"
  );
  const data = await res.json();

  const newMovie = await saveMovie(data);
}

export async function getGenres() {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=0a012ded28de69faf32ed68a3c2944fd`
  );
  const data = await res.json();

  data.genres.forEach(async (genre: { id: any; name: string }) => {
    const newMovieGenre = await createGenre([genre.id, genre.name]);
  });
}

export async function fetchCast(movieId: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=0a012ded28de69faf32ed68a3c2944fd`
  );
  const data = await res.json();

  const actors = data.cast.filter(
    (actor: { known_for_department: string }) =>
      actor.known_for_department === "Acting"
  );

  return actors;
}

export async function fethchMovieDetails(movieId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=0a012ded28de69faf32ed68a3c2944fd`
  );
  const data = await res.json();

  return data;
}

export async function fetchMovieTrailer(movieId: string) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=0a012ded28de69faf32ed68a3c2944fd`
  );
  const data = await res.json();
  return data;
}
