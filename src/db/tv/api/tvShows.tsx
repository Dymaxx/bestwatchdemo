"use server";
import { createGenre } from "@/db/Movies/Data/insert";
import { log } from "console";
import { saveTvShow } from "../Data/getTvShow";

export async function fetchPopulairTvShows() {
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/tv/week?api_key=0a012ded28de69faf32ed68a3c2944fd&language=en-US&page=5"
  );
  const data = await res.json();
  data.results.map(async (tvShow: any) => {
    // log(tvShow);
    const newTvShow = await saveTvShow(tvShow);
  });

  return data;
}

export async function fetchUpcomingTvShows() {
  const res = await fetch(
    "https://api.themoviedb.org/3/discover/tv?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_release_type=2|3&release_date.gte={2025-01-01}&release_date.lte={2025-09-04}&api_key=0a012ded28de69faf32ed68a3c2944fd"
  );
  const data = await res.json();
  data.results.map(async (tvShow: any) => {
    const newMovie = await saveTvShow(tvShow);
  });
  return data;
}

export async function fetchTvCast(tvShowId: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/tv/${tvShowId}/credits?api_key=0a012ded28de69faf32ed68a3c2944fd`
  );
  const data = await res.json();

  const actors = data.cast.filter(
    (actor: { known_for_department: string }) =>
      actor.known_for_department === "Acting"
  );

  return actors;
}

export async function getTvGenres() {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/tv/list?api_key=0a012ded28de69faf32ed68a3c2944fd`
  );
  const data = await res.json();

  data.genres.forEach(async (genre: { id: any; name: string }) => {
    const newTvGenre = await createGenre([genre.id, genre.name]);
  });
}
