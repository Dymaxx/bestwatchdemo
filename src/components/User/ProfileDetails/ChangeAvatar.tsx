"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaImage } from "react-icons/fa";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { revalidateGivenPath, uploadImage } from "@/app/actions";
import toast from "react-hot-toast";
import { user } from "@/db/schema";
import { revalidatePath } from "next/cache";

interface FileWithPreview extends File {
  preview: string;
}
export function ChangeAvatar({
  currentAvatar,
  setDialogOpen,
}: {
  currentAvatar: string | null;
  setDialogOpen: () => void;
}) {
  const [previews, setPreviews] = useState("");
  const [files, setFiles] = useState<File>();
  const defaultAvatars = [
    "https://cdn3d.iconscout.com/3d/premium/thumb/cyberpunk-10462543-8426234.png?f=webp",
    "https://cdn3d.iconscout.com/3d/premium/thumb/devil-10462540-8426231.png",
    "https://cdn3d.iconscout.com/3d/premium/thumb/man-with-katana-10462530-8426221.png",
    "https://cdn3d.iconscout.com/3d/premium/thumb/punk-10462542-8426233.png?f=webp",
  ];
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles: File[]) => {
      setPreviews(URL.createObjectURL(acceptedFiles[0]));
      setFiles(acceptedFiles[0]);
    },
  });
  return (
    <>
      <div className="text-white grid grid-cols-1  divide-y   ">
        {/* <!--Avatar--> */}
        <div>
          <div className="grid grid-cols-2 itmes-center py-4 divide-x divide-x-red">
            <div className=" flex justify-center">
              <Avatar className="w-32 h-32">
                <AvatarImage src={previews || `/images/${currentAvatar}`} />
              </Avatar>
            </div>
            <div className=" flex justify-center px-4 ">
              <div
                className="flex flex-col gap-2 border border-dashed w-full rounded-lg hover:border-blue-700 itmes-center justify-center  hover:cursor-pointer group hover:text-white"
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                <div className="flex flex-col gap-2 items-center justify-center text-center">
                  <FaImage className="text-3xl " />
                  <p className="text-sm">Upload new avatar</p>
                  <p className="text-xs">or drag and drop</p>
                </div>
              </div>
            </div>
          </div>
          <div className="py-4 flex justify-center ">
            <form
              className="flex flex-col gap-4"
              action={async () => {
                const formData = new FormData();
                if (files) {
                  formData.append("file", files);
                }
                const response = await uploadImage(formData);

                if (response) {
                  setDialogOpen();
                  revalidateGivenPath(`/user/${user.userName}`);
                  toast.success("Avatar updated successfully");
                }
              }}
            >
              <button className="= bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg">
                Save
              </button>
            </form>
          </div>
        </div>

        <div className="items-center justify-center flex flex-col">
          <div className="py-4 flex justify-center ">Choose a new avatar</div>
          <div className="flex flex-row gap-4 flex-wrap">
            {defaultAvatars.map((avatar, index) => (
              <Avatar
                key={index}
                className="h-24 w-24 hover:border-red-600 hover:border hover:cursor-pointer"
              >
                <AvatarImage src={avatar} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
