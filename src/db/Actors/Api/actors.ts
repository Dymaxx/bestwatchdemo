import { db } from "../..";
import { actor } from "../../schema";
export async function getAllActors() {
  const allActors = await db.select().from(actor);

  return allActors;
}
