import { selectWatchListByName } from "@/db/WatchLists/select";
import { fetchUserId } from "@/lib/fetchUserData";
import Image from "next/image";
import { MdEdit } from "react-icons/md";
import { WatchListDetailsEdit } from "./WatchListDetailsEddit";
import { log } from "console";
import { formattedDate } from "@/lib/utils";
export async function WatchListDetails({
  watchListName,
}: {
  watchListName: string;
}) {
  const userId = await fetchUserId();
  const watchList = await selectWatchListByName(userId, watchListName);

  return (
    <div className="flex flex-row gap-4  bg-primary rounded-xl relative pr-4">
      <Image
        className="object-cover object-center w-40 h-40 rounded-2xl"
        src={`/images/${watchList.image}`}
        width={500}
        height={500}
        alt="Picture of the author"
      />
      <div className="px-4 pt-2 flex flex-col gap-1">
        <h1 className="text-3xl capitalize">
          {watchListName.replace("-", " ")}
        </h1>
        <p className="text-xl font-bold">
          Created at{" "}
          <span className="text-red-500">
            {formattedDate(watchList.added_at)}
          </span>
        </p>
        {watchList.description && (
          <p className="">Description: {watchList.description}</p>
        )}
      </div>
      <div className="p-4 hover:scale-125 transition ease-in-out duration-200 hover:cursor-pointer flex absolute top-0 right-0">
        <WatchListDetailsEdit watchList={watchList} />
      </div>
    </div>
  );
}
