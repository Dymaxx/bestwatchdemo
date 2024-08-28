import { BsChatRightText, BsMoonStarsFill } from "react-icons/bs";
import { CiBurger, CiMenuBurger, CiSearch } from "react-icons/ci";
import { IoNotifications } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { UserPopUp } from "./User/userPopUp";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { fetchUserData } from "@/lib/fetchUserData";
import { SearchBar } from "./SearchBar";
import { FaHamburger } from "react-icons/fa";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FaCompass, FaRegHeart } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import Link from "next/link";
import { IconButton } from "./ui/buttons/iconButton";
import { MdAccountCircle } from "react-icons/md";
import { HomeIcon } from "lucide-react";
export async function TopBar() {
  const userData = await fetchUserData();
  const user = await auth().sessionId;
  const userId = (await auth().userId) as string;
  const response = clerkClient();
  const navLinks = [
    {
      name: "Account",
      icon: <MdAccountCircle />,
      link: "/user/" + userData?.userName,
    },
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
    <div className="   flex flex-row justify-between h-9 ">
      {/* Search bar */}
      <SearchBar />
      {/* <!-- right nav second section --> */}

      <section className="flex flex-row gap-10 h-9">
        <div className="text-lg flex items-center">
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger className="text-white">
                {" "}
                <CiMenuBurger className="text-xl" />
              </SheetTrigger>
              <SheetContent className="bg-[#0d0d0d] p-0 border-l-0">
                <SheetHeader className="text-white ">
                  <SheetTitle className="text-white  bg-primary p-4   ">
                    <div className="gap-4 py-4 flex flex-row justify-between">
                      <div className="flex flex-row gap-4 items-center">
                        <Image
                          className="rounded-full w-24 h-24"
                          src={"/" + userData?.profilepic || "/nft.png"}
                          width={500}
                          height={500}
                          alt="Picture of the author"
                        />
                        <div>
                          <h3 className="capitalize">{` Hi, ${userData?.userName}`}</h3>
                          <p>
                            {userData?.firstName + " " + userData?.lastName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </SheetTitle>
                  <SheetDescription>
                    <div className="px-4 py-4 flex gap-4 flex-col">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          className="  flex scale-icons items-center gap-3 justify-between rounded-lg text-xl text-white"
                          href={link.link}
                        >
                          <IconButton
                            icon={link.icon}
                            text={link.name}
                          ></IconButton>
                        </Link>
                      ))}
                    </div>
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
          <div className=" items-center gap-3 text-sm hidden md:flex  ">
            {userData ? (
              <Popover>
                <PopoverTrigger>
                  <Image
                    className="rounded-full w-8 h-8"
                    src={"/images/" + userData?.profilepic || "/nft.png"}
                    width={32}
                    height={32}
                    alt="nft"
                  />
                </PopoverTrigger>
                <PopoverContent className="w-52 pt-3   focus-ring-0 flex flex-col gap-3 border-none bg-[#0d0d0d] ">
                  <UserPopUp navLinks={navLinks} userData={userData} />
                </PopoverContent>
              </Popover>
            ) : (
              <SignInButton />
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
