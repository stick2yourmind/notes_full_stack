"use client"

import { NoteCard } from "./components";
import { getActiveNotes } from "./services";

export default async function Home() {
  const notesData = getActiveNotes()
  const activeNote = await notesData
  
  return (
    <main className="flex flex-col w-full justify-start max-w-5xl bg-stone-500/30 p-2 rounded-md">
      <h2 className="text-lg text-pink-600 font-bold">
        My active notes
      </h2>
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      { activeNote === null ? "Could not fetch data" : 
          !activeNote.length 
              ? "There are no active notes" 
              : activeNote.map(note => 
                <NoteCard 
                  title={note.title}
                  description={note.description}
                  updatedAt={note.updatedAt}
                  archived={note.archived}
                  id={note.id}
                  key={note.id}
                />)
          }
      </section>
    </main>
  )
}