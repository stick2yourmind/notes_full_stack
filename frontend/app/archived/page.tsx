"use client"

import { NoteCard, Note } from "../components";
import { getArchivedNotes } from "../services";

export default async function Archived() {
  const notesData = await getArchivedNotes()
  const archivedNote = notesData
  return (
    <main className="flex flex-col w-full justify-start max-w-5xl bg-stone-500/30 p-2 rounded-md">
      <h2 className="text-lg text-pink-600 font-bold">
        My archived notes
      </h2>
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        { archivedNote === null ? "Could not fetch data" : 
          !archivedNote.length 
              ? "There are no archived notes" 
              : archivedNote.map(note => 
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

export const revalidate = 1; 