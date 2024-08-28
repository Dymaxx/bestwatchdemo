import { db } from "..";
import { tvShow } from "../schema";

export const getPopularTvShows = async () => {
  const tvShows = await db.select().from(tvShow).limit(4);

  const tvShowsToReturn = tvShows.map((tvShow) => {
    return { tvShow: tvShow };
  });
  return tvShowsToReturn;
};
