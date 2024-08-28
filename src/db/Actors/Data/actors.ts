import { db } from "@/db";
import { actor, cast, tvCast } from "@/db/schema";
import { InferInsertModel } from "drizzle-orm";
import { Actor } from "../../../../types/movies";
import { log } from "console";

export async function saveActor(data: any) {
  // Save the actor
  const newActor = await db
    .insert(actor)
    .values({
      api_id: data.id,
      name: data.name,
      gender: data.gender,
      image: data.profile_path,
    })
    .onConflictDoNothing()
    .returning();

  if (newActor.length === 0) {
    return false;
  }
  return newActor;
}

export async function saveCast(data: InferInsertModel<typeof cast>) {
  // Save the cast
  const newCast = await db
    .insert(cast)
    .values({
      movieId: data.movieId,
      actorId: data.actorId,
      character: data.character,
      known_for_department: data.known_for_department,
    })
    .onConflictDoNothing()
    .returning();

  if (newCast.length === 0) {
    return false;
  }
  return newCast;
}

export async function saveTvCast(data: InferInsertModel<typeof tvCast>) {
  // Save the cast
  const newCast = await db
    .insert(tvCast)
    .values({
      tvShowId: data.tvShowId,
      actorId: data.actorId,
      character: data.character,
      known_for_department: data.known_for_department,
    })
    .onConflictDoNothing()
    .returning();

  if (newCast.length === 0) {
    return false;
  }
  return newCast;
}
