'use server'

import { db } from "@/db";
import { room, Room } from "@/db/schema";
import { getSession } from "@/lib/auth";

export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
    const session = await getSession()
    console.log(session)

    if (!session) {
        throw new Error("User must be logged in before creating a room")
    }
    await db.insert(room).values({...roomData, userId: session.user.id})
}