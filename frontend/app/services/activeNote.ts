import { Note } from "../components";
import api from "./api";

export async function activeNote(noteId:number) {
  try {
    const { data } = await api.patch<Note>(`/note/${noteId}`,{ archived: false });
    return data
  } catch (error) {
    return null
  }
}