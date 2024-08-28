import { FaPlusCircle } from "react-icons/fa";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { AddGenre } from "./AddGenre";
import { favGenres } from "../../../../types/user";
import { selectAllGenres } from "@/db/user/Data/select";
import { log } from "console";
const movieGenres = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
];
// Fetch the user's favorite genres from the database
export async function FavoriteGenres({
  genres,
  user,
}: {
  genres: favGenres[];
  user: { id: number; userName: string };
}) {
  const allGenres = await selectAllGenres();
  return (
    <div className="flex flex-col gap-4 border border-gray-50/20 p-5 rounded-2xl col-span-2">
      <h1 className="text-2xl font-bold">Favorite Genres</h1>
      <div className="flex flex-row flex-wrap gap-2 ">
        {genres.map((genre, index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-2 p-2 bg-gray-50/10 rounded-2xl hover:scale-105 transition duration-300 cursor-pointer"
          >
            <p>{genre.name}</p>
          </div>
        ))}
        <Popover>
          <PopoverTrigger>
            <div className="flex flex-row items-center gap-2 p-2 bg-gray-50/10 rounded-2xl hover:scale-105 transition duration-300 cursor-pointer ">
              <p className="flex flex-row items-center gap-2">
                Add genre
                <FaPlusCircle />{" "}
              </p>
            </div>
          </PopoverTrigger>

          <AddGenre favoriteGenres={genres} user={user} allGenres={allGenres} />
        </Popover>
      </div>
    </div>
  );
}
