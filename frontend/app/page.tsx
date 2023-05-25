'use client';
/* eslint-disable prettier/prettier */
/* eslint-disable @next/next/no-img-element */

import { useDispatch } from 'react-redux';
import { NoteCard } from './components';
import { getActiveNotes } from './services';
import { CreateEditModalType, enableCreateEditModal } from '@/redux/features/createEditModalSlice';

export default async function Home() {
  const dispatch = useDispatch()
  const notesData = getActiveNotes();
  const activeNote = await notesData;

  const createNote = () => {
    dispatch(enableCreateEditModal({ type: CreateEditModalType.CREATE, currentNote: null }))
  }

  return (
    <main className="flex flex-col w-full justify-start max-w-5xl bg-stone-500/30 p-2 rounded-md">
      <h2 className="text-lg text-pink-600 font-bold">My active notes</h2>
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">

        <button
          className='flex flex-col items-center justify-center gap-2 p-2 bg-stone-500/70 rounded-md transition duration-300 ease-in-out hover:bg-stone-500 hover:scale-105'
          onClick={createNote}
        >
          <img className='invert h-12' src="/image/add.svg" alt="create note" />
          <p>Create note</p>
        </button>

        {activeNote === null
          ? 'Could not fetch data'
          : !activeNote.length
            ? 'There are no active notes'
            : activeNote.map((note) => (
              <NoteCard
                title={note.title}
                description={note.description}
                updatedAt={note.updatedAt}
                archived={note.archived}
                id={note.id}
                key={note.id}
              />
            ))}
      </section>
    </main>
  );
}
