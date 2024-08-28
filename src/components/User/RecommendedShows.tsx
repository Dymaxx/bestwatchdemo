import { MovieCard } from "../movieCard";
import { InferSelectModel } from "drizzle-orm";
import { movie } from "@/db/schema";
import { log } from "console";
import { RecommendedMovieProps } from "../../../types/movies";

export async function RecommendedShows({
  movies,
}: {
  movies: {
    movie: InferSelectModel<typeof movie>;
    genres: number[];
  }[];
}) {
  const futureCount = movies.length <= 3 ? movies.length : 4;
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold">Recomended Movies</h1>
      <div className={`grid grid-cols-${futureCount} gap-6`}>
        {movies.map((movie, index) => (
          <div className="h-48 object-cover flex" key={index}>
            <div className="relative object-contain flex">
              <MovieCard recomendedShow={movie} type="movie" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
