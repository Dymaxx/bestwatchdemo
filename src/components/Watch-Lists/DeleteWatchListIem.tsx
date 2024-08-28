"use client";
import { TiDelete } from "react-icons/ti";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { useState } from "react";
import { deleteWatchListItem } from "@/app/actions";
import { log } from "console";
import { usePathname } from "next/navigation";

export function DeleteWatchListIemAlert({
  showName,
  watchListId,
  mediaType,
  mediaId,
}: {
  showName: string;
  watchListId: number;
  mediaType: string;
  mediaId: number;
}) {
  const [open, setOpen] = useState(false);
  const url = usePathname();
  return (
    <div
      onClick={(event) => {
        event.preventDefault();
      }}
    >
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger className="absolute top-4 right-0">
          <div className="text-red-500 text-3xl   transition-all duration-300 ease-in-out group-hover:opacity-100 md:opacity-0 group-hover:max-h-screen opacity-100 max-h-0 z-10 ">
            <TiDelete />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-[#0d0d0d] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete {showName}?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-white">
              This will permanently delete this show from the watchlist.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setOpen(false)}
              className="text-white bg-primary"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                await deleteWatchListItem(watchListId, mediaType, mediaId, url);
                // Show success toast

                setOpen(false);
              }}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
