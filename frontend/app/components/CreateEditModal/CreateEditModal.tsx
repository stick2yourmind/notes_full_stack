'use client';
import { deleteNote } from '@/app/services';
import { resetDeleteModal } from '@/redux/features/deleteModalSlice';
import { RootState } from '@/redux/store';
import { useRouter } from 'next/navigation';
import { Note } from '../NoteCard/NoteCard.types';
import { useForm } from 'react-hook-form';
import { ToastType, enableToast } from '@/redux/features/toastSlice';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';

export type CreateEditModalProps = {
  mode: 'Edit' | 'Create';
  previous: Pick<Note, 'archived' | 'description' | 'title'>;
};
type FormData = {
  Title: string;
  Description: string;
};
export default function CreateEditModal({ mode, previous }: CreateEditModalProps) {
  const router = useRouter();
  const noteId = useSelector((state: RootState) => state.deleteModalReducer.currentNoteId);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit((data, e) => {
    console.log(data);
  });

  const confirmDelete = async () => {
    if (noteId) {
      const wasDeleted = !!(await deleteNote(noteId));
      if (wasDeleted) {
        dispatch(
          enableToast({
            type: ToastType.SUCCESS,
            message: 'Note was deleted',
          }),
        );
        dispatch(resetDeleteModal());
        router.refresh();
      } else {
        dispatch(
          enableToast({
            type: ToastType.ERROR,
            message: 'Note could not be deleted',
          }),
        );
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm 
    flex justify-center items-center"
    >
      <div className="flex flex-col min-w-[350px]">
        <button className="text-white text-xl place-self-end" onClick={() => dispatch(resetDeleteModal())}>
          X
        </button>
        <section className="bg-white p-2 rounded flex flex-col items-center justify-center">
          <p className="text-pink-800 text-lg">{mode} Note</p>
          <form onSubmit={onSubmit} className="flex flex-col gap-2 min-w-[80%]">
            <label htmlFor="title" className="text-purple-950">
              Title
            </label>
            <input
              className="text-black border-2 border-solid	border-stone-950 rounded"
              id="title"
              type="text"
              placeholder="Title"
              {...register('Title', {
                required: { value: true, message: 'is required' },
              })}
            />
            <p className="text-pink-600">{errors?.Title?.message ? `Title ${errors?.Title?.message}` : ''}</p>

            <label htmlFor="description" className="text-purple-950">
              Description
            </label>
            <textarea
              className="text-black border-2 border-solid	border-stone-950 rounded overflow-y-hidden min-h-[10rem]"
              id="description"
              placeholder="Description"
              {...register('Description', {
                required: { value: true, message: 'is required' },
                maxLength: { value: 500, message: 'must have less than 500' },
              })}
            />
            <p className="text-pink-600">
              {errors?.Description?.message ? `Description ${errors?.Description?.message}` : ''}
            </p>

            <button className="bg-pink-700 p-1 rounded" onClick={confirmDelete}>
              Confirm
            </button>

            <button className="bg-teal-600 p-1 rounded" onClick={() => dispatch(resetDeleteModal())}>
              Cancel
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
