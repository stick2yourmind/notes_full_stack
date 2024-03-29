/* eslint-disable @next/next/no-img-element */
import formatDistance from 'date-fns/formatDistance';
import { NoteCardProps } from './NoteCard.types';
import { useDispatch } from 'react-redux';
import { enableDeleteModal } from '@/redux/features/deleteModalSlice';
import { CreateEditModalType, enableCreateEditModal } from '@/redux/features/createEditModalSlice';
import { activeNoteState, archiveNoteState } from '@/redux/features/noteSlice';
import { noteService } from '@/services/note.service';
import { Note } from '@/data/types';

export default function NoteCard({ 
  title, 
  description, 
  updatedAt, 
  archived, 
  id, 
  categories 
}: NoteCardProps) {
  const dispatch = useDispatch();

  const dateAgo = formatDistance(new Date(updatedAt), new Date(), {
    addSuffix: true,
  });

  const renderDeleteModal = () => {
    dispatch(enableDeleteModal(id));
  };

  const renderEditModal = () => {
    dispatch(
      enableCreateEditModal({
        type: CreateEditModalType.EDIT,
        currentNote: { id, title, description, archived, categories },
      }),
    );
  };

  return (
    <article className="flex flex-col gap-2 p-2 bg-stone-500/70 rounded-md transition duration-300 ease-in-out hover:bg-stone-500 hover:scale-105 w-[200px]">
      <h3 className="text-amber-400/90 font-bold">{title}</h3>
      <div className="flex flex-col gap-1">
        <p>{description}</p>
        <p className="self-end text-cyan-50/50">{dateAgo}</p>
      </div>
      <div className="flex gap-2 justify-end items-center">
        {archived ? (
          <button
            onClick={() => {
              noteService.activeNote<Note>(id);
              dispatch(activeNoteState({id}));
            }}
          >
            <img className="h-6 invert" src="/image/active.svg" alt="active note" />
          </button>
        ) : (
          <button
            onClick={() => {
              noteService.archiveNote<Note>(id);
              dispatch(archiveNoteState({id}));
            }}
          >
            <img className="h-6 invert" src="/image/archive.svg" alt="archive note" />
          </button>
        )}
        <button onClick={renderEditModal}>
          <img className="h-6 invert" src="/image/edit.svg" alt="edit note" />
        </button>
        <button onClick={renderDeleteModal}>
          <img className="h-6 invert" src="/image/delete.svg" alt="delete note" />
        </button>
      </div>
    </article>
  );
}
