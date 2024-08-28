import React from "react";
import Image from "next/image";
import Link from "next/link";
import { InferSelectModel } from "drizzle-orm";
import { watchlist } from "@/db/schema";
import { fetchUserId } from "@/lib/fetchUserData";
import { selectWatchlistByUserId } from "@/db/user/Data/select";
import { headers } from "next/headers";
import { log } from "console";
import { convertToUrl } from "@/lib/utils";

export async function SavedWatchlists({ userName }: { userName: string }) {
  const userId = await fetchUserId();
  const watchLists: InferSelectModel<typeof watchlist>[] =
    await selectWatchlistByUserId(userId);

  const url = `/user/${userName}/watchlist/`;

  return (
    <div className="flex flex-col gap-4 py-10">
      <h1 className="text-3xl font-bold">Watch Lists</h1>
      <div className={`grid grid-cols-4 gap-6`}>
        {watchLists.map((watchlist) => (
          <Link
            replace={false}
            href={`${url}${convertToUrl(watchlist.name)}`}
            key={watchlist.id}
          >
            {/* <!-- Wathch List Items --> */}
            <div className="relative group transition flex  duration-500 ease-in-out h-full ">
              <Image
                className="object-cover object-center  rounded-2xl  aspect-[16/9]"
                src={`/images/${watchlist.image}`}
                width={500}
                height={50}
                alt="Picture watchlist"
              />
            </div>
            <div>
              <p className=" capitalize  font-bold">{watchlist.name}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
