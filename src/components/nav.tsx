import { IoExitOutline } from "react-icons/io5";
import { IconButton } from "./ui/buttons/iconButton";
import { FaCompass, FaRegHeart } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import Image from "next/image";
import Link from "next/link";
import { fetchUserData } from "@/lib/fetchUserData";
import { HomeIcon } from "lucide-react";

export async function Nav() {
  const userData = await fetchUserData();

  const navLinks = [
    {
      name: "Home",
      icon: <HomeIcon />,
      link: "/",
    },
    {
      name: "Watchlist",
      icon: <FaRegHeart />,
      link: `/user/${userData?.userName}`,
    },
    {
      name: "Coming soon",
      icon: <SlCalender />,
      link: "/comingsoon",
    },
  ];
  return (
    <section className="col-span-2  min-h-screen hidden lg:block ">
      <nav className="flex flex-col  fixed h-full py-10 justify-between  ">
        <div className="flex flex-col   gap-16 ">
          <Link href={"/"}>
            <Image
              className="w-24 h-24 rounded-full"
              src="/logo-small.jpg"
              width={500}
              height={500}
              alt="Picture of the author"
            />
          </Link>

          {/* <!-- left nav first section --> */}
          <section className="flex flex-col gap-5 ">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                className="  flex scale-icons items-center gap-3 justify-between rounded-lg"
                href={link.link}
              >
                <IconButton icon={link.icon} text={link.name}></IconButton>
              </Link>
            ))}
          </section>
        </div>
        <section>
          {/* <p className='text-xs text-gray-300'>
                  <IoExitOutline />
                  <span>Log out</span>
                </p> */}

          <div className="scale-icons ">
            <IconButton icon={<IoExitOutline />} text="Log out"></IconButton>
          </div>
        </section>
      </nav>
    </section>
  );
}
