import React from "react";
import EditRoomForm from "./EditRoomForm";
import { getRoom } from "@/app/service/rooms";
import { unstable_noStore } from "next/cache";

const EditRoomPage = async ({ params }: { params: { roomId: string } }) => {
  unstable_noStore()
  const room = await getRoom(params.roomId);

  if (!room) {
    return <div>Room not found</div>;
  }
  return (
    <div className="container mx-auto pt-12 pb-24">
      <h1 className="text-4xl font-bold flex-col gap-8">Edit Room</h1>
      <EditRoomForm room={room} />
    </div>
  );
};

export default EditRoomPage;
