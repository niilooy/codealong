import { getRoom } from "@/app/service/rooms";
import TagsList, { splitTags } from "@/components/TagsList";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";
import Link from "next/link";
import React from "react";
import { CodealongVideoPlayer } from "./VideoPlayer";

const RoomPage = async (props: { params: { roomId: string } }) => {
  const roomId = props.params.roomId;
  const room = await getRoom(roomId);

  if (!room) {
    return <div>No room of this ID found</div>;
  }

  return (
    <div className="">
      <div className="grid grid-cols-4 min-h-screen">
        <div className="col-span-3 p-4 pr-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
            <CodealongVideoPlayer room={room} />
          </div>
        </div>
        <div className="col-span-1 p-4 pl-2">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
            <h1 className="text-base">{room?.name}</h1>
            {room.githubRepo && (
              <Link
                className="flex items-center gap-2 text-center text-sm"
                href={room.githubRepo}
                target="blank"
                rel="noopener noreferrer"
              >
                <Github />
                GitHub
              </Link>
            )}
            <p className="text-base text-gray-600">{room?.description}</p>
            <h3>Tags:</h3>
            <TagsList tags={splitTags(room.tags)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomPage;
