"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "./ui/button";
import { log } from "console";

export function LoadMore() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("genre");
  return (
    <div className="flex justify-center">
      <Button onClick={() => router.push(`/?genre=${search}`)} className="mt-8">
        Load more
      </Button>
    </div>
  );
}
