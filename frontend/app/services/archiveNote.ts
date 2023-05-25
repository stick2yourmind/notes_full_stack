import { Note } from "../components";
import api from "./api";

export async function archiveNote(noteId:number) {
  try {
    const { data } = await api.patch<Note>(`/note/${noteId}`,{ archived: true });
    return data
  } catch (error) {
    return null
  }
}