import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { eq, sql } from "drizzle-orm";

export async function getRooms(search: string | undefined) {
  let where;
  if (search) {
    where = sql`LOWER(${room.tags}) LIKE ${`%${search.toLowerCase()}%`}`;
  }
  const rooms = await db.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  return await db.query.room.findFirst({
    where: sql`${room.id} = ${roomId}`,
  });
}

export async function getUserRooms() {
  const session = await getSession();

  if (!session) {
    throw new Error("User not authenticated");
  }
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });
  return rooms;
}

export async function createRoom(
  roomData: Omit<Room, "id" | "userId">,
  userId: string
) {
  await db.insert(room).values({ ...roomData, userId });
}

export async function editRoom(roomData: Room) {
  await db.update(room).set(roomData).where(eq(room.id, roomData.id));
}

export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}
