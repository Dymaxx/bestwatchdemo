import { US } from "country-flag-icons/react/3x2";
import { FaImdb } from "react-icons/fa";
import { Button } from "./ui/button";
import Image from "next/image";
import { faker } from "@faker-js/faker/locale/en_CA";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
export function Hero() {
  return (
    <div className="relative group ratio-16/9 h-[500px]  flex flex-row transition duration-500 ease-in-out rounded-xl">
      <div className=" p-4  w-2/5 bg-black text-white rounded-l-xl flex flex-col px-6  relative group justify-center gap-10 ">
        <div className="flex flex-col  w-full  gap-4 ">
          <h1 className="text-6xl ">Deadpool & Wolverine</h1>
          <p className="text-md xl:text-lg text-gray-400">Release date: 2024</p>
        </div>

        <Link
          href="/details/movie/Deadpool%20&%20Wolverine"
          className="px-2 py-2 w-18 rounded-lg flex text-center items-center justify-center text-md bg-primary text-white hover:bg-[#f00] transition duration-300 ease-in-out"
        >
          More info
        </Link>
      </div>
      <div className="relative hidden h-full w-full md:flex object-portition-bottom">
        <Image
          className=" flex  w-full h-full rounded-r-2xl object-top object-cover"
          src={"/images/hero.png"}
          width={500}
          height={500}
          alt="Poster"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-black via-black/40 to-transparent rounded-r-2xl"></div>
      </div>
    </div>
  );
}
