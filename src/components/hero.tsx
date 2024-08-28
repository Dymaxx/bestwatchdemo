import { US } from "country-flag-icons/react/3x2";
import { FaImdb } from "react-icons/fa";
import { Button } from "./ui/button";
import Image from "next/image";
import { faker } from "@faker-js/faker/locale/en_CA";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
export function Hero() {
  return (
    <div className=" bg-[#0d0d0d] w-full rounded-3xl">
      <div className=" w-full h-96  grid grid-cols-2 ">
        <div className="px-10 pr-24  pt-16 pb-8  flex flex-col justify-between ">
          <div className="flex flex-col gap-10">
            <h1 className="text-6xl  ">
              The <span className="font-bold">Soul Conductor</span>
            </h1>

            <div className="flex gap-3 items-center">
              <div className="flex flex-row gap-2 items-center">
                {" "}
                <FaImdb className="text-2xl text-yellow-400 " />
                <p className="text-xs">7.8</p>
              </div>
              <div className="flex flex-row gap-2  items-center">
                {" "}
                <US title="United States" className="w-6" />
                <p className="text-xs"> English</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button className="bg-red-600 px-7 rounded-2xl">Info</Button>
          </div>
        </div>

        <div className=" relative">
          <Image
            className="w-full h-full scale-110 blur-3xl opacity-50 rounded-2xl absolute"
            src="/soul.png"
            width={500}
            height={500}
            alt="Picture of the author"
          />
          <Image
            className="w-full h-full rounded-lg absolute "
            src="/soul.png"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>
      </div>
    </div>
  );
}
