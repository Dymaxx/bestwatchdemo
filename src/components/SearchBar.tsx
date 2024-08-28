"use client";

import { CiSearch } from "react-icons/ci";
import { Input } from "./ui/input";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();

  const [placeholder, setPlaceholder] = useState("");

  // Empty searchbar when changing pages
  useEffect(() => {
    if (pathname != "/") {
      setPlaceholder("");
    }
  }, [pathname]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(pathname);
    setPlaceholder(e.target.value);
    if (pathname == "/") {
      router.push(`?search=${e.target.value}`);
    } else {
      router.replace(`/?search=${e.target.value}`);
    }
  };
  return (
    <section className="w-3/5 ">
      <div className=" bg-[#0d0d0d] border-none rounded-2xl px-5  text-xs flex items-center gap-2">
        <CiSearch />
        <Input
          type="text"
          className="bg-[#0d0d0d] border-none h-9 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Search"
          value={placeholder}
          onChange={(e) => handleChange(e)}
        />
      </div>
    </section>
  );
}
