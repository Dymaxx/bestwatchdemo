import { PopoverContent } from "@radix-ui/react-popover";
import { faker } from "@faker-js/faker";
import { SignOutButton } from "@clerk/nextjs";
import Link from "next/link";
import { loadEnvFile } from "process";
import { log } from "console";
import { IconButton } from "../ui/buttons/iconButton";

export async function UserPopUp({
  userData,
  navLinks,
}: {
  userData: { firstName: string; lastName: string; userName: string };
  navLinks: { name: string; icon: JSX.Element; link: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-xl text-white">Hi {userData.firstName}</h3>
      <div className="   flex flex-col gap-2 text-white">
        {/* <!--Notification--> */}
        {navLinks.map((link) => (
          <Link
            key={link.name}
            className="  flex scale-icons items-center gap-3 justify-between rounded-lg"
            href={link.link}
          >
            <p>{link.name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
