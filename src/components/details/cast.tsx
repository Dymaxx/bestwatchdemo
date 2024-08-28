import Image from "next/image";
import { Actor } from "../../../types/movies";
export async function Cast({
  castMembers,
  showId,
}: {
  showId: number;
  castMembers: any;
}) {
  return (
    <div>
      {
        /* <!-- Movie Cast --> */
        <div className="flex flex-col gap-4 text-3xl font-bold">
          <h1>Cast</h1>
          <div className=" grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4  justify-around ">
            {castMembers.slice(0, 6).map((actor: Actor, index: number) => {
              if (actor.image) {
                return (
                  <div key={index} className="flex flex-col gap-2">
                    <Image
                      className="object-cover bg-red-300"
                      src={`https://image.tmdb.org/t/p/w500${actor.image}`}
                      width={500}
                      height={500}
                      alt={""}
                    ></Image>

                    <p className="text-lg">{actor.name}</p>
                    <p className="text-sm font-normal">{actor.character}</p>
                  </div>
                );
              }
            })}
          </div>
        </div>
      }
    </div>
  );
}
