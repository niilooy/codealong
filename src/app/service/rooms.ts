import { db } from "@/db";
import { room } from "@/db/schema";
import { sql } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms(search: string | undefined) {
  unstable_noStore();
  let where;
  if (search) {
    // Use LOWER() function for case-insensitive comparison
    where = sql`LOWER(${room.tags}) LIKE ${`%${search.toLowerCase()}%`}`;
  }
  const rooms = await db.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore();
  return await db.query.room.findFirst({
    where: sql`${room.id} = ${roomId}`,
  });
}