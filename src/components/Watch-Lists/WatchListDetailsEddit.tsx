"use client";
import Image from "next/image";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  uploadImages,
  revalidateGivenPath,
  edditWatchList,
} from "@/app/actions";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { MdEdit } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";

export function WatchListDetailsEdit({ watchList }: { watchList: any }) {
  const [previews, setPreviews] = useState(`/images/${watchList.image}`);
  const [files, setFiles] = useState<File>();
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const router = useRouter();
  const url = usePathname();
  // DropZone
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

  const handleSubmit = async (formData: FormData) => {
    // Upload the image
    formData.append("image", files as File);
    const upLoadedImage = await uploadImages(formData);

    if (upLoadedImage) {
      // Create the form data
      formData.append("watchListId", watchList.id.toString());
      formData.append("prevName", watchList.name);
      formData.append("prevImage", watchList.image);
      formData.append("newImageName", upLoadedImage);

      // Edit the watchlist with the new image and name
      const changedWatchList = await edditWatchList(formData);

      // Redirect to the new watchlist
      const newUrl =
        url?.split("/").slice(0, 4).join("/") + `/${changedWatchList?.name}`;
      // close the dialog

      setShowDialog(false);

      // If the watchlist name is not changed, revalidate the path
      revalidateGivenPath(newUrl);
      // If the watchlist name is changed, redirect to the new watchlist name
      router.push(newUrl);
    }
  };
  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger>
        <MdEdit />
      </DialogTrigger>
      <DialogContent className="bg-[#0d0d0d]">
        <div className=" text-white flex flex-col items-center gap-4  px-8 ">
          {/* <!-- New watchlist --> */}
          <div>
            <h2 className="text-2xl font-bold capitalize">
              edit watchlist {watchList.name}
            </h2>
            <div className="text-white grid grid-cols-1  divide-y   ">
              {/* New watchlist */}
              <form
                // Prevent the form from submitting on enter
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
                className="flex flex-col gap-4"
                action={handleSubmit}
              >
                {/* Form fields */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="watchlist">Name</label>
                  <input
                    className="bg-[#0d0d0d] border rounded-lg px-2 py-2"
                    type="text"
                    name="watchListName"
                    id="watchlist"
                  />
                  <label className="" htmlFor="watchlist">
                    Description
                  </label>
                  <textarea
                    typeof="text-area"
                    className="bg-[#0d0d0d] border rounded-lg px-2 py-2 "
                    name="description"
                    id="watchlist"
                    defaultValue={watchList.description}
                  />
                </div>
                {/* <!-- Image preview --> */}

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
                  <p className="text-sm">Change</p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
