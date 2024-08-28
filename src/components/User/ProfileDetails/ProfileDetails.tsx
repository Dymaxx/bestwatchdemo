"use client";
import { MdEdit } from "react-icons/md";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ChangeAvatar } from "./ChangeAvatar";
import { User } from "../../../../types/user";
import { useState } from "react";
import { set } from "react-hook-form";
export function ProfileDetails({ user }: { user: User }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleDialogOpen = () => setDialogOpen(false);
  return (
    <div className="flex flex-col gap-4 border border-gray-50/20 p-5 rounded-2xl col-span-1">
      <div className="flex flex-col 2xl:flex-row items-center gap-4  ">
        <Dialog open={dialogOpen}>
          <DialogTrigger onClick={() => setDialogOpen(true)}>
            <div></div>
            <div className="w-28 h-28 2xl:w-40 2xl:h-40 group relative">
              <Image
                className="rounded-full  w-full h-full object-cover "
                src={"/images/" + user?.profilepic || "/nft.png"}
                width={500}
                height={500}
                alt="nft"
              />
              {/* <!-- edit button --> */}
              <div className="absolute inset-0 rounded-full  group-hover:bg-black/40 transition duration-300 items-center justify-center flex cursor-pointer">
                <MdEdit className="text-2xl text-white hidden group-hover:block  " />
              </div>
            </div>
          </DialogTrigger>

          <DialogContent className="bg-[#0d0d0d] ">
            <ChangeAvatar
              setDialogOpen={() => handleDialogOpen()}
              currentAvatar={user?.profilepic}
            />
          </DialogContent>
        </Dialog>

        {/* <!-- User Details --> */}
        <div className="flex flex-col">
          <h1 className="text-2xl">Hii {user?.firstName}</h1>
          <p className="text-sm">Popcorn Prodigy 🍿</p>
        </div>
      </div>
    </div>
  );
}
