import { Note } from "../components";
import { notesMock } from "../data/notesMock";

export default function Archived() {
  return (
    <main className="flex flex-col w-full justify-start max-w-5xl bg-stone-500/30 p-2 rounded-md">
      <h2 className="text-lg text-pink-600 font-bold">
        My archived notes
      </h2>
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {
          notesMock.map(note => 
          <Note 
            title={note.title}
            description={note.description}
            updatedAt={note.updatedAt}
            key={note.id}
          />)
        }
      </section>
    </main>
  )
}
