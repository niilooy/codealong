import React from "react";
import CreateRoomForm from "./CreateRoomForm";
import { unstable_noStore } from "next/cache";
const CreateRoomPage = () => {
  unstable_noStore();
  return (
    <div className="container mx-auto pt-12 pb-24">
      <h1 className="text-4xl font-bold flex-col gap-8">Create Room</h1>
      <CreateRoomForm />
    </div>
  );
};

export default CreateRoomPage;
