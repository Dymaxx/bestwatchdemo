import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  selectAllMovieGenres,
  selectAllMoviesFilteredByGenre,
  selectMoviesByGenre,
  selectMoviesByName,
  selectMoviesByReleaseDate,
  selectMoviesByReleaseDateAndGenre,
} from "@/db/Movies/Data/select";
import {
  selectAllTvGenres,
  selectAllTvShowsByGenre,
  selectAllTvShowsFilteredByGenre,
  selectTvShowsByName,
  selectTvShowsByReleaseDate,
  selectTvShowsByReleaseDateAndGenre,
} from "@/db/tv/Data/select";
import { FavoriteGenres } from "@/components/User/FavoriteGenres/FavoriteGenres";
import { selectFavoriteGenres } from "@/db/genres/select";
import { fetchUserId } from "./fetchUserData";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetchCategoriesByType(mediaType: "tvShow" | "movie") {
  if (mediaType === "movie") {
    const categories = await selectAllMovieGenres();
    return categories;
  }

  if (mediaType === "tvShow") {
    const categories = await selectAllTvGenres();
    return categories;
  }
}
export async function categoriesWithItems() {
  const categories = await fetchCategoriesByType("movie");
}

export const fetchMediaByType = async (
  mediaType: "tvShow" | "movie",
  categoryId: number
) => {
  if (mediaType === "movie") {
    const movies = await selectMoviesByGenre(categoryId);
    return movies;
  } else {
    const tvShows = await selectAllTvShowsByGenre(categoryId);
    return tvShows;
  }
};

export const fetchMediaCategories = async (mediaType: "tvShow" | "movie") => {
  if (mediaType === "movie") {
    const categories = await selectAllMovieGenres();
    return categories;
  }
  if (mediaType === "tvShow") {
    const categories = await selectAllTvGenres();
    return categories;
  }
};

export function convertToUrl(url: string) {
  return url.replace(/\s+/g, "-").toLowerCase();
}
export function convertFromUrl(url: string) {
  return url.replace(/-/g, " ");
}

export function formattedDate(date: Date) {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

export async function selectMediaByCategory(mediaType: "tvShow" | "movie") {
  if (mediaType === "movie") {
    return await selectAllMoviesFilteredByGenre();
  } else {
    return selectAllTvShowsFilteredByGenre();
  }
}

export async function fetchShowsByName(title: string) {
  const movies = await selectMoviesByName(title);
  const tvShows = await selectTvShowsByName(title);

  const result = { movies: [...movies], tvShows: [...tvShows] };
  return result;
}

export const getComingSoon = async () => {
  const movies = await selectMoviesByReleaseDate();
  const tvShows = await selectTvShowsByReleaseDate();
  const result = { movies: [...movies], tvShows: [...tvShows] };
  return result;
};

export const getComingSoonByGenre = async () => {
  const movies = await selectMoviesByReleaseDateAndGenre();
  const tvShows = await selectTvShowsByReleaseDateAndGenre();
  const result = { movies: [...movies], tvShows: [...tvShows] };
  return result;
};
