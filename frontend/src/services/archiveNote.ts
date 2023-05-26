import { Note } from '../data/types';
import api from './api';

export async function archiveNote(noteId: number) {
  try {
    const { data } = await api.patch<Note>(`/note/${noteId}`, { archived: true });
    return data;
  } catch (error) {
    return null;
  }
}
