import { useForm } from 'react-hook-form';
import { ToastType, enableToast } from '@/redux/features/toastSlice';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { resetCreateEditModal } from '@/redux/features/createEditModalSlice';
import { useState } from 'react';
import { Note } from '@/data/types';
import { addNoteState, editNoteState } from '@/redux/features/noteSlice';
import CategorySelector from '../CategorySelector/CategorySelector';
import { noteService } from '@/services/note.service';
import { CreateEditModalProps, FormData } from './CreateEditModal.types';

export default function CreateEditModal({ mode, previous }: CreateEditModalProps) {
  const [categories,setCategories] = useState<number[]>([]);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      Title: previous?.title || '',
      Description: previous?.description || '',
    },
  });
  
  const confirmCreate = async (newNote: Pick<Note, 'title' | 'description'>) => {
    try {
      const noteResponse = await noteService.post<Note, Partial<Note>>({
        data:
        {
          ...newNote, 
          categories
        }
      });
      
      dispatch(
        enableToast({
          type: ToastType.SUCCESS,
          message: 'Note was created',
        }),
      );

      dispatch(resetCreateEditModal());
      
      dispatch(addNoteState({
        ...newNote,
        archived: false,
        updatedAt: noteResponse.updatedAt,
        id:noteResponse.id,
        categories
      }));
    } catch (error) {
      dispatch(
        enableToast({
          type: ToastType.ERROR,
          message: 'Note could not be created',
        }),
      );
    }
  };

  const confirmEdit = async (note: Pick<Note, 'id' | 'title' | 'description' | 'archived'>) => {
    try {
      const noteResponse = await noteService.put<Note, Partial<Note>>({
        editId: note.id,
        data:
        {
          ...note, 
          categories
        }
      });
      
      dispatch(
        enableToast({
          type: ToastType.SUCCESS,
          message: 'Note was edited',
        }),
      );

      dispatch(resetCreateEditModal());

      
      dispatch(editNoteState({
        ...note,
        archived: noteResponse.archived,
        updatedAt: noteResponse.updatedAt,
        id: noteResponse.id,
        categories
      }));
    } catch (error) {
      dispatch(
        enableToast({
          type: ToastType.ERROR,
          message: 'Note could not be edited',
        }),
      );
    }
  };

  const onSubmit = handleSubmit((data) => {
    if (mode === 'Create')
      confirmCreate({
        title: data.Title,
        description: data.Description,
      });
    else 
      confirmEdit({
        id: previous?.id || 0,
        title: data.Title,
        description: data.Description,
        archived: previous?.archived || false,
      });
    
  });

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm 
    flex justify-center items-center"
    >
      <div className="flex flex-col min-w-[350px] max-w-[400px]">
        <button className="text-white text-xl place-self-end" onClick={() => dispatch(resetCreateEditModal())}>
          X
        </button>
        <section className="bg-white p-2 rounded flex flex-col items-center justify-center">
          <p className="text-pink-800 text-lg">{mode} Note</p>
          <form onSubmit={onSubmit} className="flex flex-col gap-2 min-w-[80%] max-w-full">
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
            
            <CategorySelector callback={setCategories} 
              selectedCategories={previous?.categories || []}/>

            <button className="bg-pink-700 p-1 rounded" type="submit">
              Confirm
            </button>

            <button className="bg-teal-600 p-1 rounded" onClick={() => dispatch(resetCreateEditModal())}>
              Cancel
            </button>
          </form>
          
        </section>
      </div>
    </div>
  );
}
