import { RootState } from '@/redux/store';
import { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import DeleteModal from '../DeleteModal/DeleteModal';
import { ToastType, resetToast } from '@/redux/features/toastSlice';
import 'react-toastify/dist/ReactToastify.css';
import CreateEditModal from '../CreateEditModal/CreateEditModal';
import { CreateEditModalType } from '@/redux/features/createEditModalSlice';

export default function Modals() {
  const isDeleteModalEnable = useSelector((state: RootState) => state.deleteModalReducer.enable);
  const createEditModalState = useSelector((state: RootState) => state.createEditModalReducer);
  const toastState = useSelector((state: RootState) => state.toastReducer);
  const dispatch = useDispatch();
  
  useEffect(() => {
    if (toastState.enable) {
      toast.clearWaitingQueue();
      if (toastState.type === ToastType.SUCCESS)
        toast.success(toastState.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

      if (toastState.type === ToastType.ERROR)
        toast.error(toastState.message, {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });

      
      dispatch(resetToast());
    }
  }, [toastState.enable]);

  return (
    <Fragment>
      {isDeleteModalEnable && <DeleteModal />}

      {createEditModalState.enable && createEditModalState.type === CreateEditModalType.CREATE ? (
        <CreateEditModal mode="Create" previous={null} />
      ) : (
        ''
      )}

      {createEditModalState.enable && createEditModalState.type === CreateEditModalType.EDIT ? (
        <CreateEditModal mode="Edit" previous={createEditModalState.currentNote} />
      ) : (
        ''
      )}

      <ToastContainer limit={3} />
    </Fragment>
  );
}
