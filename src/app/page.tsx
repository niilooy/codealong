import { db } from '@/db'
import { unstable_noStore } from 'next/cache';
import React from 'react'

export default async function Home() {
  unstable_noStore();
  const rooms = await db.query.room.findMany();

  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      { rooms.map((room) => {
        return <div key={room.id}>{room.name}</div>
      }) }
    </main>
  )
}