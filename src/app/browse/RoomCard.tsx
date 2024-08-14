import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../../components/ui/button";
import TagsList from "../../components/TagsList";
import { splitTags } from "@/lib/utils";
import { Room } from "@/db/schema";
import Link from "next/link";
import { Github } from "lucide-react";

const RoomCard = ({ room }: { room: Room }) => {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="flex-shrink-0">
        <CardTitle className="text-lg sm:text-xl truncate">{room.name}</CardTitle>
        <CardDescription className="text-sm line-clamp-2">{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-grow">
        <div className="flex-grow">
          <TagsList tags={splitTags(room.tags)} />
        </div>
        {room.githubRepo && (
          <Link
            className="flex items-center gap-2 text-sm"
            href={room.githubRepo}
            target="blank"
            rel="noopener noreferrer"
          >
            <Github className="w-4 h-4" />
            <span className="truncate">GitHub</span>
          </Link>
        )}
      </CardContent>
      <CardFooter className="flex-shrink-0">
        <Button asChild className="w-full sm:w-auto">
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RoomCard;