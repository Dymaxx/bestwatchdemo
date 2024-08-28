import { getPopularTvShows } from "@/db/tv/data";
import { getPopularMovies } from "@/db/Movies/Data/select";
import { CategorySection } from "./CategorySection";
import { ShowCard } from "./showCard";
import { motion } from "framer-motion";

export async function Recomended({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const recomendedMovies = await getPopularMovies();
  const recomendTvshows = await getPopularTvShows();

  return (
    <>
      <div className="flex flex-col ">
        <h1 className="text-3xl font-bold">Recomended Movies</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 lg:gap-4 rounded-xl">
          {recomendedMovies.map((movie, index) => (
            <ShowCard key={index} type="movie" recomendedShow={movie} />
          ))}
        </div>
      </div>
      <CategorySection media="movie" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Recomended TV Shows</h1>
        <div className="grid  grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-4 rounded-xl">
          {recomendTvshows.map((tvShow: any, index) => (
            <ShowCard type="tvShow" key={index} recomendedShow={tvShow} />
          ))}
        </div>
      </div>
      <CategorySection media="tvShow" />
    </>
  );
}
