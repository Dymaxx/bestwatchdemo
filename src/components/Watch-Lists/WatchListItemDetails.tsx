import { movie, tvShow, watchlist } from "@/db/schema";

import { InferSelectModel } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { DeleteWatchListIemAlert } from "./DeleteWatchListIem";
import { Movie } from "../../../types/movies";
import { TVShow } from "../../../types/tvShows";

interface WatchListItemDetailsProps {
  show: Movie | TVShow;
  type: "movie" | "tvShow";
  watchListId: number;
  showCloseButton?: boolean;
}

export function WatchListItemDetails({
  show,
  type,
  watchListId,
  showCloseButton = false,
}: WatchListItemDetailsProps) {
  return (
    <Link
      href={`/details/${type}/${show.title}`}
      className="relative group flex flex-row lg:h-64 transition duration-500 ease-in-out rounded-xl"
    >
      <div className="col-span-3 p-4  md:w-full bg-primary text-white rounded-l-xl gap-1 flex flex-col px-6  relative group ">
        <div className="flex flex-col md:flex-row w-full  gap-4">
          <Image
            className="object-cover object-center w-1/2 md:w-16 md:h-16  "
            src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
            width={500}
            height={50}
            alt="Poster"
          />
          <div className="col-span-1">
            <p className=" text-xl xl:text-2xl">{show.title}</p>
            <p className="text-md xl:text-lg text-gray-400">
              {type === "movie"
                ? (show as Movie).release_date
                : (show as TVShow).first_air_date}
            </p>
          </div>
        </div>

        <p className="line-clamp-5 md:line-clamp-5 pr-40 md:pr-0 ">
          {show.overview}{" "}
        </p>
        {showCloseButton && (
          <DeleteWatchListIemAlert
            watchListId={watchListId}
            showName={show.title}
            mediaType={type}
            mediaId={show.id}
          />
        )}
      </div>
      <div className="relative hidden h-full w-2/5 md:flex">
        <Image
          className="object-cover object-center w-full h-full rounded-r-2xl"
          src={`https://image.tmdb.org/t/p/w500${show.poster_path}`}
          width={500}
          height={50}
          alt="Poster"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-primary via-primary/60 to-transparent rounded-r-2xl"></div>
      </div>
    </Link>
  );
}
