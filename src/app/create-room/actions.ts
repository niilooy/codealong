"use server";

import { room, Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { createRoom } from "../service/rooms";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
  const session = await getSession();
  console.log(session);

  if (!session) {
    throw new Error("User must be logged in before creating a room");
  }
  await createRoom(roomData, session.user.id);
  revalidatePath("/"); //clear the cache and create a fresh copy
}
