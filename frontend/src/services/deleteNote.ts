import { Note } from '../data/types';
import api from './api';

export async function deleteNote(noteId: number) {
  try {
    const { data } = await api.delete<Note>(`/note/${noteId}`);
    return data;
  } catch (error) {
    return null;
  }
}
