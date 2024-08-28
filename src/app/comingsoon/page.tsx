import { WatchListItemDetails } from "@/components/Watch-Lists/WatchListItemDetails";
import { getComingSoon } from "@/lib/utils";
import { log } from "console";
import { FutureReleases } from "./FutureReleases";

const ComingSoon = async () => {
  const commingShows = await getComingSoon();
  return (
    <div className="flex gap-4 flex-col">
      <FutureReleases futureReleases={commingShows?.movies} type={"movie"} />
      <FutureReleases futureReleases={commingShows?.tvShows} type={"tvShow"} />
    </div>
  );
};

export default ComingSoon;
