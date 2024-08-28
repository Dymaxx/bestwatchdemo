import { getCastMembers, getMovieByName } from "@/db/Movies/Data/insert";
import { getTvCast, getTvShowByName } from "@/db/tv/Data/getTvShow";
import { isShowLiked } from "@/db/user/Data/select";
import { Actor } from "../../../../../types/movies";
import { ShowDetail } from "@/components/details/ShowDetail";
import { Cast } from "@/components/details/cast";

export default async function Movie({
  params,
}: {
  params: { slug: string[] };
}) {
  const tvShowName = params.slug[0];
  const tvShowDetails = await getTvShowByName(tvShowName);
  const isLiked = await isShowLiked(tvShowDetails.id, "tvShow");
  const castMembers: Actor[] = await getTvCast(tvShowDetails.id);

  if (!tvShowDetails) return <div>Movie not found</div>;

  const { trailer, title } = tvShowDetails;
  return (
    <div className=" w-full  justify-center flex ">
      <div className="flex flex-col gap-16">
        <ShowDetail
          showDetails={tvShowDetails}
          mediaType="tvShow"
          title={title}
          trailer={trailer}
          isLiked={isLiked}
          castMembers={castMembers}
          isInWatchlist={false}
        />
        <Cast showId={tvShowDetails.id} castMembers={castMembers} />
      </div>
    </div>
  );
}
