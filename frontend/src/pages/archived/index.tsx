/* eslint-disable @next/next/no-img-element */

import { NoteCard } from '@/components';
import { NoteResponse } from '@/data/types';
import { setNotesState } from '@/redux/features/noteSlice';
import { RootState } from '@/redux/store';
import { noteService } from '@/services/note.service';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function Archived() {
  const dispatch = useDispatch();
  const noteState = useSelector((state: RootState) => state.noteReducer.notes);
  const archivedNote = noteState.filter((note) => note.archived === true);

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      const resData = noteService.getArchivedNotes<NoteResponse[]>({signal:abortController.signal});
      const data =  await resData;
      const dataNormalized = data.map(dataItem => ({
        ...dataItem, 
        categories: dataItem.categories?.map(categoryItem => categoryItem.id) || []}
      ));
      return dataNormalized;
    };
    fetchData()
      .then(notes => dispatch(setNotesState(notes || [])))
      .catch( () => abortController.abort());
  
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
                categories={note.categories}
                id={note.id}
                key={note.id}
              />
            ))}
      </section>
    </main>
  );
}
