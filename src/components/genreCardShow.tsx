import Image from "next/image";
import Link from "next/link";

export function GenreCardCopy({
  recomendedShow,
  type,
}: {
  recomendedShow: any;
  type: string;
}) {
  return (
    <Link
      className="hover:scale-[1.02] transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-black/30"
      href={`/details/${type}/${recomendedShow.title}`}
    >
      {/* <!-- Recommended Movies --> */}
      <div className="relative group transition flex  duration-500 ease-in-out h-full ">
        <Image
          className="object-cover object-center  rounded-2xl   "
          src={`https://image.tmdb.org/t/p/w500${recomendedShow.poster_path}`}
          width={500}
          height={50}
          alt="Picture of the author"
        />
        {/* <div className="bg-gray-800/30 absolute top-0 left-0 w-full h-full cursor-pointer hidden hover:block group-hover:block ">
          <div className=" justify-end pb-4 h-full text-sm  flex flex-col px-4">
            <h1 className="  font-bold">{recomendedShow.title}</h1>
            <p>Genre: Action</p>
            <p>Year: {recomendedShow.release_date}</p>
            <p>Rating: 5</p>
          </div>
        </div> */}
      </div>
    </Link>
  );
}
