/* eslint-disable @next/next/no-img-element */

import { NoteCard } from '@/components';
import { setNotesState } from '@/redux/features/noteSlice';
import { RootState } from '@/redux/store';
import { getArchivedNotes } from '@/services';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Archived() {
  const dispatch = useDispatch();
  const noteState = useSelector((state: RootState) => state.noteReducer.notes);
  const archivedNote = noteState.filter((note) => note.archived === true);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      const resData = getArchivedNotes(abortController);
      const data =  await resData;
      return data;
    };
    fetchData()
      .then(notes => dispatch(setNotesState(notes || [])));
  
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <main className="flex flex-col w-full justify-start max-w-5xl bg-stone-500/30 p-2 rounded-md">
      <h2 className="text-lg text-pink-600 font-bold">My archived notes</h2>
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {archivedNote === null
          ? 'Could not fetch data'
          : !archivedNote.length
            ? 'There are no archived notes'
            : archivedNote.map((note) => (
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
