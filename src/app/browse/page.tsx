import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Room } from "@/db/schema";
import { getRooms } from "../service/rooms";
import SearchBar from "./SearchBar";
import RoomCard from "@/app/browse/RoomCard";
import { unstable_noStore } from "next/cache";
import Image from "next/image";

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search);

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href={`/create-room`}>Create Room</Link>
        </Button>
      </div>

      <div className="mb-12">
        <SearchBar />
      </div>

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room: Room) => {
          return <RoomCard key={room.id} room={room} />;
        })}
      </div>

      {/* handling empty pages */}
      {rooms.length === 0 && (
        <div className="flex flex-col gap-4 justify-center items-center mt-24">
          <Image
            src="./not-found.svg"
            alt="not-found"
            width={200}
            height={200}
          />
          <h2 className="text-2xl">Its lonely here. No rooms yet.</h2>
        </div>
      )}
    </main>
  );
}
