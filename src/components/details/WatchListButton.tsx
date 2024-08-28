"use client";
import { useState } from "react";
import { Button } from "../ui/button";

import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  createNewWatchList,
  createNewWatchListItem,
  revalidateGivenPath,
  uploadImages,
} from "@/app/actions";
import { log } from "console";
import { toast } from "react-toastify";
import { SelectForm } from "./selectForm";

export function WatchListButton({
  watchlists,
  title,
  media,
  movieId,
}: {
  movieId: number;
  watchlists: any;
  title: string;
  media: string;
}) {
  const [previews, setPreviews] = useState("/placeholder.png");
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showNewWatchlist, setShowNewWatchlist] = useState<boolean>(false);
  const [selectedWatchList, setSelectedWatchList] = useState<string>("");

  const [files, setFiles] = useState<File>();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: File[]) => {
      setPreviews(URL.createObjectURL(acceptedFiles[0]));
      setFiles(acceptedFiles[0]);
    },
  });

  const handleClick = () => {
    setShowDialog(!showDialog);
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger>
        <Button className="rounded-xl bg-red-600  text-sm  ">
          Add to list
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-[#0d0d0d]">
        <div className=" text-white flex flex-col items-center gap-4  px-8 ">
          {watchlists && watchlists.length > 0 && (
            <div className="flex flex-col gap-4 w-full">
              <p>Select a watchlist or create a new one</p>

              <SelectForm
                watchlists={watchlists}
                media={media}
                movieId={movieId}
                movieTitle={title}
                onClick={handleClick}
              />

              <Button
                onClick={() => setShowNewWatchlist(!showNewWatchlist)}
                className="rounded-xl bg-red-600  text-sm  "
              >
                Create a new list
              </Button>
            </div>
          )}

          {/* <!-- New watchlist --> */}
          {(showNewWatchlist || watchlists.length === 0) && (
            <div>
              <h2 className="text-2xl font-bold">New watchlist</h2>
              <div className="text-white grid grid-cols-1  divide-y   ">
                {/* New watchlist */}
                <form
                  className="flex flex-col gap-4"
                  action={async (formData) => {
                    // Upload the image
                    if (files) {
                      formData.append("image", files as File);
                      const upLoadedImage = await uploadImages(formData);
                      // Create the new watchlist
                      if (upLoadedImage) {
                        formData.append("imageName", upLoadedImage);
                        const newWatchList = await createNewWatchList(formData);
                        // save the item in the new watchlist
                        if (newWatchList) {
                          createNewWatchListItem(
                            newWatchList[0].id,
                            movieId,
                            title,
                            media
                          );
                        }
                        toast.success(
                          "Created new watchlist and added show to watchlist"
                        );
                        revalidateGivenPath(`/details/${media}/${title}`);

                        setShowDialog(false);
                      }
                    }
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <label className="bg-[#0d0d0d]" htmlFor="watchlist">
                      Name
                    </label>
                    <input
                      className="bg-[#0d0d0d] border rounded-lg px-5 "
                      type="text"
                      name="name"
                      id="watchlist"
                    />
                  </div>

                  <div className="grid grid-cols-2 itmes-center py-4 divide-x divide-x-red">
                    <div className=" flex justify-center">
                      <Image
                        src={`${previews} `}
                        width={500}
                        height={500}
                        alt="Picture of the author"
                      />
                    </div>
                    <div className=" flex justify-center px-4 ">
                      {/* <!-- Upload image --> */}
                      <div
                        className="flex flex-col gap-2 border border-dashed w-full rounded-lg hover:border-blue-700 itmes-center justify-center  hover:cursor-pointer group hover:text-white"
                        {...getRootProps()}
                      >
                        <input type="file" name="file" {...getInputProps()} />

                        <div className="flex flex-col gap-2 items-center justify-center text-center">
                          <p className="text-sm">Upload new avatar</p>
                          <p className="text-xs">or drag and drop</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className=" flex justify-center py-4 bg-red-600 rounded-lg"
                  >
                    <p className="text-sm">Create</p>
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
