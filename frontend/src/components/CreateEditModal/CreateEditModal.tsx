import { useForm } from 'react-hook-form';
import { ToastType, enableToast } from '@/redux/features/toastSlice';
import { useDispatch } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { resetCreateEditModal } from '@/redux/features/createEditModalSlice';
import { useState } from 'react';
import { createNote } from '@/services/createNote';
import { editNote } from '@/services/editNote';
import { Category, Note } from '@/data/types';
import { addNoteState, editNoteState } from '@/redux/features/noteSlice';

export type CreateEditModalProps = {
  mode: 'Edit' | 'Create';
  previous: Pick<Note, 'description' | 'title' | 'id' | 'archived'> | null;
};
type FormData = {
  Title: string;
  Description: string;
};
export default function CreateEditModal({ mode, previous }: CreateEditModalProps) {
  const [categories,setCategories] = useState<Category[]>([]);
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
    const categoriesArray = categories.map(category => category.id);
    const wasCreated = !!(await createNote({
      ...newNote,
      categories: categoriesArray
    }));

    if (wasCreated) {
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
        updatedAt: String(new Date()),
        id:Number(new Date()),
        categories: categoriesArray
      }));
    } else 
      dispatch(
        enableToast({
          type: ToastType.ERROR,
          message: 'Note could not be created',
        }),
      );
    
  };

  const confirmEdit = async (newNote: Pick<Note, 'title' | 'description' | 'archived'>) => {
    if (previous?.id) {
      const wasEdited = !!(await editNote(previous.id, newNote));
      if (wasEdited) {
        dispatch(
          enableToast({
            type: ToastType.SUCCESS,
            message: 'Note was edited',
          }),
        );
        dispatch(resetCreateEditModal());
        dispatch(editNoteState({
          ...newNote,
          updatedAt: String(new Date()),
          id: previous.id
        }));
      } else 
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
            
            {/* <CategorySelector callback={setCategories}/> */}

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
