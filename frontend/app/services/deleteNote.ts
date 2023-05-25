import { Note } from "../components";
import api from "./api";

export async function  deleteNote(noteId:number) {
  try {
    const { data } = await api.delete<Note>(`/note/${noteId}`);
    return data
  } catch (error) {
    return null
  }
}