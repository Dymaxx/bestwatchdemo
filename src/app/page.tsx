import { CiSearch } from "react-icons/ci";
import { Recomended } from "@/components/Recomended";
import { log } from "console";
import { Hero } from "@/components/hero";
import { fetchShowsByName } from "@/lib/utils";
import { GenreCardCopy } from "@/components/genreCardShow";
// export default async function Home({
//   params,
//   searchParams,
// }: {
//   params: { slug: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// }) {
//   log("params", params);
//   log("searchParams", searchParams);

//   return (

//   );
// }

export default async function Home({ searchParams }: { searchParams: any }) {
  const search = searchParams.search;
  const shows = await fetchShowsByName(search);
  if (!search) {
    return (
      <>
        <section className=" gap-8 flex flex-col ">
          <Hero />
          <Recomended searchParams={searchParams} />
        </section>
      </>
    );
  }
  // Show no results if no shows are found for the search
  if (shows.movies.length == 0 && shows.tvShows.length == 0) {
    return (
      <div>
        <h1>No results</h1>
      </div>
    );
  }

  // Render the shows if they are found for the search
  return (
    <div>
      {Object.entries(shows).map((entry) => {
        const [key, value] = entry;
        const mediaType = key === "movies" ? "movie" : "tvShow"; // Change the key to single word
        return (
          <div className="flex flex-col gap-4 py-10 " key={key}>
            {value.length > 0 && (
              <div className="flex flex-col gap-4 ">
                <h1 className="font-bold capitalize">{key}</h1>

                <div className="grid grid-cols-4 gap-4  ">
                  {value.map((show: any) => {
                    return (
                      <GenreCardCopy
                        key={key}
                        type={mediaType}
                        recomendedShow={show}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
