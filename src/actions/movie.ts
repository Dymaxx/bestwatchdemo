"use server";
import { fetchMovieTrailer, fethchMovieDetails } from "@/db/Movies/Api/movies";
import { getMovieByGenre } from "@/db/Movies/Data/insert";
import { fetchTvShowTrailer } from "@/db/tv/Data/getTvShow";
import { log } from "console";

export async function getMovieByGenreAction() {
  const movies = await getMovieByGenre(258);

  if (!movies) {
    log("no movies found");
  }
}
export async function getMovieDetails(formData: FormData) {
  const movieID = formData.get("movieId") as string;
  const details = await fethchMovieDetails(movieID);
}

export async function getMovieTrailer(movieID: string) {
  const videos = await fetchMovieTrailer(movieID);

  const trailer = videos.results.filter(
    (video: any) => video.type === "Trailer" || video.type === "Clip"
  );
  return trailer.pop();
}

export async function getTvShowTrailer(videoId: string) {
  const videos = await fetchTvShowTrailer(videoId);

  const trailer = videos.results.filter(
    (video: any) => video.type === "Trailer" || video.type === "Clip"
  );
  return trailer.pop();
}
