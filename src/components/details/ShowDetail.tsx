import { Button } from "@/components/ui/button";
import Image from "next/image";
import { BsHeartFill } from "react-icons/bs";
import { Key } from "react";
import { handleLike } from "@/app/actions";
import { selectWatchlistByUserId } from "@/db/user/Data/select";
import { fetchUserId } from "@/lib/fetchUserData";
import { Actor } from "../../../types/movies";
import { log } from "console";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LikeButton } from "./LikeButton";
import { WatchListButton } from "./WatchListButton";
import { Trailer } from "./trailer";
import { revalidatePath } from "next/cache";

export async function ShowDetail({
  showDetails,
  mediaType,
  title,
  trailer,
  isLiked,
  isInWatchlist,
  castMembers,
}: {
  showDetails: any;
  title: string;
  mediaType: "tvShow" | "movie";
  trailer: string | null;
  isLiked: boolean;
  isInWatchlist: boolean;
  castMembers: Actor[] | null;
}) {
  const handleLikeClick = async () => {
    revalidatePath(`/details/${mediaType}/${showDetails.name}`);
  };
  const userId = await fetchUserId();
  const watchlists = await selectWatchlistByUserId(userId);
  return (
    <div className="flex flex-col gap-8 ">
      <div className="flex   w-full items-center  lg:justify-start justify-center ">
        <div className="w-full max-w-[500px] justify-start  ">
          {" "}
          <h1 className="text-3xl font-bold ">{title}</h1>
        </div>
      </div>
      <div className="flex flex-col lg:grid grid-cols-7 gap-8 h-full ">
        <div className="col-span-3  flex h-full flex-col gap-4">
          {/* <!-- Poster --> */}
          <div className=" w-full h-full justify-center items-center flex">
            <Image
              className="h-full w-full max-w-[500px]  object-cover flex"
              src={`https://image.tmdb.org/t/p/w500${showDetails.poster_path}`}
              width={500}
              height={500}
              alt={""}
            ></Image>
          </div>
          {/* <!-- Buttons --> */}
          {/* <div className="flex gap-4">
            {isInWatchlist ? (
              <Button className="text-white bg[transparent] ">
                In watchlist
              </Button>
            ) : (
              <WatchListButton
                movieId={showDetails.id}
                watchlists={watchlists}
                title={title}
                media={mediaType}
              />
            )}

            <LikeButton
              showDetails={showDetails}
              mediaType={mediaType}
              isLiked={isLiked}
            />
          </div> */}
        </div>
        {/* <!-- Details --> */}
        <div className=" relative col-span-4 gap-4 flex flex-col ">
          <div className="flex flex-col  w-full  items-center lg:items-start ">
            <div className=" grid grid-cols-2 lg:flex flex-col  w-full  max-w-[500px] ">
              <p>Tile: {showDetails.title}</p>
              <p>Year: 2022</p>
              <p>Genre: {showDetails.genres}</p>
              <p>Duration: {showDetails.runtime}</p>
            </div>
          </div>
          {/* <!-- Movie Info --> */}
          <div className=" flex flex-col gap-10">
            <p>{showDetails.overview}</p>
          </div>{" "}
          <div className="w-full  hidden xl:flex absolute bottom-0 ">
            {trailer && <Trailer trailer={trailer} />}
          </div>
        </div>
      </div>
      <div className="w-full flex xl:hidden">
        {trailer && <Trailer trailer={trailer} />}
      </div>
      <ToastContainer />
    </div>
  );
}
