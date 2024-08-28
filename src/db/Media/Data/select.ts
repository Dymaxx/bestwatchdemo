import { db } from "@/db";
import { genre, movie, movieGenre, tvShow, tvShowGenre } from "@/db/schema";
import { log } from "console";
import { eq } from "drizzle-orm";
export async function selectShowsByType(type: string) {
  const mediaTypeGenre = type === "movie" ? movieGenre : tvShowGenre;
  const mediaTypeId =
    type === "movie" ? movieGenre.movieId : tvShowGenre.tvShowId;
  const mediaType = type === "movie" ? movie : tvShow;

  const shows = await db
    .select({ genreName: genre.name, mediaTypeGenre: mediaTypeGenre })
    .from(genre)
    .innerJoin(mediaTypeGenre, eq(genre.id, mediaTypeGenre.genreId));
  //     .innerJoin(mediaType, eq(mediaType.id, mediaTypeId));
  //   const groupByGenre = (shows: any, type: string) => {
  //     const groupedShows = shows.reduce((acc: any, show: any) => {
  //       const { genreName, movie } = show;
  //       if (!acc[genreName]) {
  //         acc[genreName] = {
  //           type: type,
  //           genreName,
  //           show: [],
  //         };
  //       }
  //       acc[genreName].show.push(movie);
  //       return acc;
  //     }, {});

  //     return Object.values(groupedShows);
  //   };
  //   return groupByGenre(shows, type);
}
