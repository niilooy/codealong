import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { Github } from "lucide-react";
import { getRooms } from "./service/rooms";
import TagsList from "@/components/TagsList";
import SearchBar from "./SearchBar";
import { splitTags } from "@/lib/utils";

function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagsList tags={splitTags(room.tags)} />
        {room.githubRepo && (
          <Link
            className="flex items-center gap-2"
            href={room.githubRepo}
            target="blank"
            rel="noopener noreferrer"
          >
            <Github />
            GitHub
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function Home({
  searchParams,
}: {
  searchParams: { search: string };
}) {
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
    </main>
  );
}
