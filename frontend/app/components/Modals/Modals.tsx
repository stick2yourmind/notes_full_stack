"use client"
import { RootState } from "@/redux/store";
import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import DeleteModal from "../DeleteModal/DeleteModal";
import { ToastType, resetToast } from "@/redux/features/toastSlice";
import 'react-toastify/dist/ReactToastify.css';

export default function Modals() {
  const isDeleteModalEnable = useSelector((state: RootState) => state.deleteModalReducer.enable);
  const toastState = useSelector((state: RootState) => state.toastReducer);
  const dispatch = useDispatch()
  
  useEffect(() => {
    if(toastState.enable){
      toast.clearWaitingQueue();
      if(toastState.type===ToastType.SUCCESS)
        toast.success(toastState.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          
      if(toastState.type===ToastType.ERROR)
        toast.error(toastState.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
      
      dispatch(resetToast())
    }
  }, [toastState.enable])
  
  return (
    <Fragment>
      { isDeleteModalEnable && <DeleteModal /> }
      <ToastContainer limit={1}/>
    </Fragment>
  )
}