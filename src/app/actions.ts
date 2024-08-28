"use server";
import {
  inserLikedShow,
  insertFavoriteGenres,
  insertWatchList,
  insertWatchListItem,
} from "@/db/user/Data/insert";
import { log } from "console";
import { favGenres, User } from "../../types/user";
import { deleteFavGenres } from "@/components/User/FavoriteGenres/DeleteFavGenres";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { fetchUserId } from "@/lib/fetchUserData";
import { deleteLikedShow } from "@/db/user/Data/delete";
import { redirect } from "next/navigation";
import { writeFile } from "fs/promises";
import { join } from "path";
import { edditUser } from "@/db/user/Data/update";
import { promises as fs } from "fs";
import { updateWatchList } from "@/db/WatchLists/update";
import { deleteWatchListItemById } from "@/db/WatchLists/Delete";
import { boolean } from "drizzle-orm/mysql-core";
export async function handleGenre(
  formData: FormData,
  genres: favGenres[],
  user: { id: number; userName: string }
) {
  //   Insert new favorite genres into the database
  const deleteAllGenres = await deleteFavGenres(user.id);
  const instertNewGenres = await insertFavoriteGenres(genres, user.id);

  if (instertNewGenres.length === 0) {
    log("No data inserted");
  } else {
    revalidatePath(`/user/${user.userName}`);
  }
}

export async function handleLike(
  showId: number,
  mediaType: "tvShow" | "movie",
  isLiked: boolean
) {
  const userId = await fetchUserId();
  revalidatePath(`/details/${mediaType}/${showId}`);
  if (isLiked) {
    const unLike = await deleteLikedShow(userId, showId, mediaType);
    return "Unliked";
  } else {
    const newLike = await inserLikedShow(showId, userId, mediaType);
    return "Liked";
  }
}

export async function uploadImage(
  data: FormData
): Promise<{ sucsess: boolean }> {
  const file: File | null = data.get("file") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }

  const userId = await fetchUserId();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const path = join("./public/images/", file.name);
  await writeFile(path, buffer);

  // Save the image path in the database
  // Call the function to update the user's profile picture
  // Call the function to update the user's profile picture
  const newProfileImage: string = file.name;
  edditUser(userId, {
    profilepic: newProfileImage,
  });
  if (newProfileImage) {
    return { sucsess: true };
  }
  return { sucsess: false };
}

export async function uploadImages(data: FormData) {
  const file: File | null = data.get("image") as File;
  if (!file) {
    throw new Error("No file uploaded");
  }
  try {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join("./public/images/", file.name);
    await writeFile(path, buffer);

    // If the writeFile operation is successful, return a success message or true
    console.log("File successfully saved");
    log("saved", file.name);
    return file.name;
  } catch (error) {
    // If an error occurs, log the error and return false or an error message
    console.error("Error saving file:", error);
    return false;
  }
}

export async function createNewWatchList(data: FormData) {
  const userId = await fetchUserId();
  const name = data.get("name") as string;
  const imageName = data.get("imageName") as string;

  try {
    const newWatchList = await insertWatchList(
      name.toLowerCase(),
      userId,
      imageName
    );

    if (newWatchList.length === 0) {
      log("No data inserted");
    } else {
      return newWatchList;
    }
  } catch (error) {
    log(error);
  }
}

export async function edditWatchList(data: FormData) {
  const rawName = data.get("watchListName") as string;
  const name = decodeURIComponent(rawName)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  const newImageName = data.get("newImageName") as string;
  const watchListId = data.get("watchListId") as string;
  const description = data.get("description") as string;
  const prevImage = data.get("prevImage") as string;
  const prevName = data.get("prevName") as string;
  log(prevImage, "prev", newImageName, " newImage");
  const image = newImageName != "undefined" ? newImageName : prevImage;
  try {
    const changedWatchList = await updateWatchList(
      // Try with the new data
      name || prevName,
      parseInt(watchListId),
      description,
      image
    );

    if (changedWatchList.length === 0) {
      log("No data inserted");
    } else {
      return changedWatchList[0];
    }
  } catch (error) {
    log(error);
  }
}

export async function navigate(data: FormData) {
  redirect(`/posts/${data.get("id")}`);
}

export async function createNewWatchListItem(
  watchlistId: number,
  showId: number,
  movieTitle: string,
  mediaType: string
) {
  try {
    const createdNewWatchListItem = await insertWatchListItem(
      watchlistId,
      showId,
      mediaType
    );
    revalidateGivenPath(`/details/${mediaType}/${showId}`);
  } catch (error) {
    log(error);
  }
}

// Revalidate path
export async function revalidateGivenPath(path: string) {
  revalidatePath(path);
}

export async function deleteWatchListItem(
  watchListId: number,
  mediaType: string,
  mediaId: number,
  url: string
) {
  try {
    const deletedWatchListItem = await deleteWatchListItemById(
      watchListId,
      mediaType,
      mediaId
    );

    revalidateGivenPath(url);
    return true;
  } catch (error) {
    log(error);
  }
}
