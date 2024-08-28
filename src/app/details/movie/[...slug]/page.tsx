import { Cast } from "@/components/details/cast";
import { ShowDetail } from "@/components/details/ShowDetail";
import { getCastMembers, getMovieByName } from "@/db/Movies/Data/insert";
import { fetchIsShowInWatchList, isShowLiked } from "@/db/user/Data/select";

export default async function Movie({
  params,
}: {
  params: { slug: string[] };
}) {
  const movieName = params.slug[0];
  const movieDetails = await getMovieByName(movieName);

  const isLiked = await isShowLiked(movieDetails.id, "movie");
  const isInWatchlist = await fetchIsShowInWatchList(movieDetails.id, "movie");
  const castMembers = await getCastMembers(movieDetails.id);

  if (!movieDetails) return <div>Movie not found</div>;

  const { trailer, title } = movieDetails;
  return (
    <div className=" w-full  justify-center flex ">
      <div className="flex flex-col gap-16">
        <ShowDetail
          showDetails={movieDetails}
          mediaType="movie"
          title={title}
          trailer={trailer}
          isLiked={isLiked}
          isInWatchlist={isInWatchlist}
          castMembers={castMembers}
        />
        <Cast showId={movieDetails.id} castMembers={castMembers} />
      </div>
    </div>
  );
}
