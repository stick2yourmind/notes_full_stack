import { resetDeleteModal } from '@/redux/features/deleteModalSlice';
import { deleteNoteState } from '@/redux/features/noteSlice';
import { ToastType, enableToast } from '@/redux/features/toastSlice';
import { RootState } from '@/redux/store';
import { deleteNote } from '@/services';
import { useDispatch, useSelector } from 'react-redux';

export default function DeleteModal() {
  const noteId = useSelector((state: RootState) => state.deleteModalReducer.currentNoteId);
  const dispatch = useDispatch();

  const confirmDelete = async () => {
    if (noteId) {
      const wasDeleted = !!(await deleteNote(noteId));
      if (wasDeleted) {
        dispatch(enableToast({ type: ToastType.SUCCESS, message: 'Note was deleted' }));
        dispatch(resetDeleteModal());
        dispatch(deleteNoteState({id:noteId}));
      } else 
        dispatch(enableToast({ type: ToastType.ERROR, message: 'Note could not be deleted' }));
      
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
          <p className="text-pink-800 text-lg">Are you sure to delete it?</p>
          <div className="flex gap-4">
            <button className="bg-pink-700 p-1 rounded" onClick={confirmDelete}>
              Confirm
            </button>
            <button className="bg-teal-600 p-1 rounded" onClick={() => dispatch(resetDeleteModal())}>
              Cancel
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
