import formatDistance from 'date-fns/formatDistance'
import { NoteCardProps } from "./NoteCard.types";

export default function NoteCard({title, description, updatedAt}:NoteCardProps) {
  const dateAgo = formatDistance(new Date(updatedAt), new Date(),{
    addSuffix: true
  })
  return (
    <article className="flex flex-col gap-2 p-2 bg-stone-500/70 rounded-md transition duration-300 ease-in-out hover:bg-stone-500 hover:scale-105">
      <h3 className='text-amber-400/90 font-bold'>{title}</h3>
      <div className="flex flex-col gap-1">
        <p>{description}</p>
        <p className='self-end text-cyan-50/50'>{dateAgo}</p>
      </div>
    </article>
  )
}