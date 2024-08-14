"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import TagsList from "./TagsList";
import { splitTags } from "@/lib/utils";
import { Room } from "@/db/schema";
import Link from "next/link";
import { Github, Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteRoomAction } from "@/app/your-rooms/actions";

const UserRoomCard = ({ room }: { room: Room }) => {
  return (
    <Card className="h-full flex flex-col justify-between">
      <CardHeader className="relative flex-shrink-0">
        <Button size="icon" className="absolute top-1 right-1 p-1">
          <Link href={`/edit-room/${room.id}`}>
            <Pencil className="w-4 h-4" />
          </Link>
        </Button>
        <CardTitle className="text-lg sm:text-xl pr-8 truncate">{room.name}</CardTitle>
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
      <CardFooter className="flex-shrink-0 flex gap-2">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join Room</Link>
        </Button>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="p-2">
              <Trash2 className="w-4 h-4" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your room.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteRoomAction(room.id)}>
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};

export default UserRoomCard;