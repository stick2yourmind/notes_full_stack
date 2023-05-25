"use client"
/* eslint-disable @next/next/no-img-element */
import formatDistance from 'date-fns/formatDistance'
import { NoteCardProps } from "./NoteCard.types";
import { activeNote, archiveNote } from '@/app/services';
import { useDispatch } from 'react-redux';
import { enableDeleteModal } from '@/redux/features/deleteModalSlice';
import { useRouter } from 'next/navigation'


export default function NoteCard({title, description, updatedAt, archived, id}:NoteCardProps) {
  const dispatch = useDispatch();
  const router = useRouter()
  
  const dateAgo = formatDistance(new Date(updatedAt), new Date(),{
    addSuffix: true
  })

  const renderDeleteModal = () => {
    dispatch(enableDeleteModal(id))
  }

  return (
    <article className="flex flex-col gap-2 p-2 bg-stone-500/70 rounded-md transition duration-300 ease-in-out hover:bg-stone-500 hover:scale-105" >
      <h3 className='text-amber-400/90 font-bold'>{title}</h3>
      <div className="flex flex-col gap-1">
        <p>{description}</p>
        <p className='self-end text-cyan-50/50'>{dateAgo}</p>
      </div>
      <div className='flex gap-2 justify-end items-center'>
        {
          archived 
            ? <button onClick={()=>{activeNote(id);router.refresh()}}>
                <img className='h-6 invert' src="/image/active.svg" alt="active note" />
              </button>
            : <button onClick={()=>{archiveNote(id);router.refresh()}}>
                <img className='h-6 invert' src="/image/archive.svg" alt="archive note" />
              </button>
        }
        <button><img className='h-6 invert' src="/image/edit.svg" alt="edit note" /></button>
        <button onClick={renderDeleteModal}>
          <img className='h-6 invert' src="/image/delete.svg" alt="delete note" />
        </button>
      </div>
    </article>
  )
}