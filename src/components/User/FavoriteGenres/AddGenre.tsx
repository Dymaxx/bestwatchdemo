"use client";

import { handleGenre } from "@/app/actions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { favGenres } from "../../../../types/user";
import { fa } from "@faker-js/faker";
import { InferSelectModel } from "drizzle-orm";
import { genre, user } from "@/db/schema";
import { loadEnvFile } from "process";
import { log } from "console";

export function AddGenre({
  favoriteGenres,
  user,
  allGenres,
}: {
  favoriteGenres: favGenres[];
  user: { id: number; userName: string };
  allGenres: InferSelectModel<typeof genre>[];
}) {
  const [activeGenre, setActiveGenre] = useState(favoriteGenres);

  const handleGenreClick = (genre: favGenres) => {
    if (activeGenre.find((g) => g.api_id === genre.api_id)) {
      // Remove the genre if it's already in the activeGenre array
      setActiveGenre(activeGenre.filter((g) => g.api_id !== genre.api_id));
    } else {
      // Add the genre if it's not in the activeGenre array
      setActiveGenre([...activeGenre, genre]);
    }
  };

  return (
    <PopoverContent className="bg-[#0d0d0d]  rounded-2xl  p-4 gap-2 flex flex-col">
      <div className="flex flex-wrap gap-2">
        {allGenres.map((genre, index) => (
          <div
            onClick={() => handleGenreClick(genre)}
            key={index}
            className={`flex flex-row items-center gap-2 p-2 bg-gray-50/10  text-white rounded-2xl focus:outline-none focus:ring focus:ring-violet-300 cursor-pointer active:bg-red-800 hover:bg-red-600 ${
              activeGenre.find((g) => g.api_id === genre.api_id) &&
              " bg-red-700  active:bg-red-800"
            }`}
          >
            <p>{genre.name}</p>
          </div>
        ))}
      </div>
      <PopoverClose>
        <form action={(e) => handleGenre(new FormData(), activeGenre, user)}>
          <button
            typeof="submit"
            className="flex flex-row items-center gap-2 p-2  bg-gray-50/10  text-white rounded-2xl focus:outline-none focus:ring focus:ring-violet-300 cursor-pointer  hover:bg-red-700 active:bg-red-800 justify-center text-xl "
          >
            <p>Save</p>
          </button>
        </form>
      </PopoverClose>
    </PopoverContent>
  );
}
