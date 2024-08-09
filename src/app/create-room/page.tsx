import React from 'react'
import CreateRoomForm from './CreateRoomForm'
const CreateRoomPage = () => {
  return (
    <div className='container mx-auto pt-12 pb-24'>
      <h1 className="text-4xl font-bold flex-col gap-8">
        Create Room
      </h1>
      <CreateRoomForm/>
    </div>
  )
}

export default CreateRoomPage
