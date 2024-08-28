"use client";
import { handleLike } from "@/app/actions";
import { Button } from "../ui/button";
import { BsHeartFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { revalidatePath, revalidateTag } from "next/cache";
import { usePathname, useRouter } from "next/navigation";

export function LikeButton({
  showDetails,
  mediaType,
  isLiked,
}: {
  showDetails: any;
  mediaType: "tvShow" | "movie";
  isLiked: boolean;
}) {
  const pathname = usePathname();
  return (
    <div>
      <form
        action={async (formData: FormData) => {
          const likedStatus = await handleLike(
            showDetails.id,
            mediaType,
            isLiked
          );
          if (likedStatus) {
            toast.success(likedStatus + " " + showDetails.title);
          }
        }}
      >
        <div className="flex gap-4  justify-center">
          <Button
            type="submit"
            className={`rounded-xl text-sm ${
              isLiked
                ? "text-white bg-red-600"
                : "text-gray-500 bg[transparent]   group hover:scale-110 transition duration-100"
            }  `}
          >
            <BsHeartFill className="group-hover:scale-110 transition duration-100 group-hover:text-white ease-in-out" />
          </Button>
        </div>
      </form>
    </div>
  );
}
