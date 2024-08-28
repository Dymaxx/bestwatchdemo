import { FutureReleases } from "@/app/comingsoon/FutureReleases";
import { getPopularMovies } from "@/db/Movies/Data/select";
import { fetchUserId } from "@/lib/fetchUserData";
import { getComingSoon, getComingSoonByGenre } from "@/lib/utils";
import { log } from "console";

export async function FutureReleaseSection({
  recomended,
}: {
  recomended: any;
}) {
  const userId = await fetchUserId();
  const commingShows = await getComingSoonByGenre();
  return (
    <div className="flex gap-4 flex-col">
      <FutureReleases futureReleases={recomended?.movies} type={"movie"} />
      <FutureReleases futureReleases={recomended?.tvShows} type={"tvShow"} />
    </div>
  );
}
