import { Note } from '../data/types';
import api from './api';

export async function activeNote(noteId: number) {
  try {
    const { data } = await api.patch<Note>(`/note/${noteId}`, { archived: false });
    return data;
  } catch (error) {
    return null;
  }
}
