import Movie from "@/app/details/movie/[...slug]/page";
import { FavoriteGenres } from "@/components/User/FavoriteGenres/FavoriteGenres";
import { ProfileDetails } from "@/components/User/ProfileDetails/ProfileDetails";
import { SavedWatchlists } from "@/components/Watch-Lists/WatchListCards";
import {
  selectFavoritesGenresByUserId,
  selectUserByUserName,
} from "@/db/user/Data/select";

import { FutureReleaseSection } from "./FutureReleases";
import { recomendShows } from "@/lib/recomended/recomendedByGenre";

export default async function User({
  params,
}: {
  params: { userName: string };
}) {
  const userName = params.userName;
  const user = await selectUserByUserName({ username: userName });
  const favoriteGenres = await selectFavoritesGenresByUserId({ id: user.id });
  const userId = user.id;
  const recomendedMovies = await recomendShows(userId);

  // Get the current date
  const currentDate = new Date();

  // Filter TV shows
  const filteredTvShows = recomendedMovies?.tvShows.filter((tvShow) => {
    if (!tvShow.first_air_date) return false;
    const firstAirDate = new Date(tvShow.first_air_date);
    return firstAirDate >= currentDate;
  });

  const filteredMovies = recomendedMovies?.movies.filter((movie) => {
    if (!movie.release_date) return false;
    const firstReleaseDate = new Date(movie.release_date);
    return firstReleaseDate >= currentDate;
  });

  // Assign the filtered arrays back to the recomended object
  const recomendedNewReleases = {
    movies: filteredMovies,
    tvShows: filteredTvShows,
  };

  // Function to filter unique items based on ID
  const filterUniqueById = (recomendedNewReleases: any[] | undefined) => {
    const seenIds = new Set();
    return recomendedNewReleases?.filter((item: { id: unknown }) => {
      if (seenIds.has(item.id)) {
        return false;
      } else {
        seenIds.add(item.id);
        return true;
      }
    });
  };

  // Filter unique TV shows and movies
  const uniqueTvShows = filterUniqueById(recomendedNewReleases.tvShows);
  const uniqueMovies = filterUniqueById(recomendedNewReleases.movies);

  // Assign the filtered arrays back to the recomended object
  recomendedNewReleases.tvShows = uniqueTvShows;
  recomendedNewReleases.movies = uniqueMovies;

  return (
    <div className="  flex flex-col xl:grid grid-cols-12 gap-4">
      <div className=" grid grid-cols-3 xl:flex  flex-col gap-4 col-span-3 ">
        <ProfileDetails user={user} />
        <FavoriteGenres genres={favoriteGenres} user={user} />
      </div>
      <div className=" flex flex-col gap-9  col-span-9">
        <FutureReleaseSection recomended={recomendedNewReleases} />
        {/* {recomendedMovies && recomendedMovies.length > 0 && (
          <RecommendedShows
            movies={recomendedMovies.slice(0, amountOfRecomendedMovies)}
          />
        )} */}

        <SavedWatchlists userName={userName} />
      </div>
    </div>
  );
}
