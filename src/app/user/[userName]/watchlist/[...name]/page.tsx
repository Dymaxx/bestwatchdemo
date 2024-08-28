import { WatchListDetails } from "@/components/Watch-Lists/WatchListDetails";
import { WatchListItemDetails } from "@/components/Watch-Lists/WatchListItemDetails";
import {
  selectWatchListByName,
  selectWatchlistByName,
} from "@/db/WatchLists/select";
import { fetchUserId } from "@/lib/fetchUserData";
import { convertFromUrl, convertToUrl } from "@/lib/utils";
import { log } from "console";
import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import Image from "next/image";

export default async function Watchlist({
  params,
}: {
  params: { name: string };
}) {
  const userId = await fetchUserId();
  const watchListName = convertFromUrl(params.name[0]);
  const watchList = await selectWatchListByName(userId, watchListName);
  const watchListItems = await selectWatchlistByName(userId, watchListName);

  if (!watchListItems) return <div>Watchlist not found</div>;
  else {
  }

  return (
    <div className="flex flex-col gap-4 ">
      <div className="flex">
        <WatchListDetails watchListName={watchListName} />
      </div>
      <div className="flex flex-col gap-4">
        {watchListItems && watchListItems.movies.length > 0 && (
          <div className="flex flex-col gap-4">
            <h1>Movies</h1>
            {/* WatchList Items */}
            <div className="flex flex-col md:grid grid-cols-1 lg:grid-cols-2 gap-6">
              {watchListItems.movies.map((movie, index) => (
                <div key={index}>
                  <WatchListItemDetails
                    show={movie}
                    type="movie"
                    watchListId={watchList.id}
                    showCloseButton={true}
                  />
                </div>
              ))}{" "}
            </div>
          </div>
        )}
        {/* WatchList Items */}
        {watchListItems && watchListItems.tvShows.length > 0 && (
          <div>
            <h2 className="text-2xl">Tv Shows</h2>
            <div className="flex flex-col lg:grid grid-cols-2 gap-6">
              {watchListItems.tvShows.map((tvShow, index) => (
                <div key={index}>
                  <WatchListItemDetails
                    show={tvShow}
                    type="tvShow"
                    watchListId={watchList.id}
                    showCloseButton={true}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
