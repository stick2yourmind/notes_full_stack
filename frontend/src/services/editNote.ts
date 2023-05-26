import { SERVER_NOTE_PATH } from '../data/constants';
import { Note } from '../data/types';
import api from './api';

export async function editNote(noteId: number, note: Pick<Note, 'title' | 'description'>) {
  try {
    const { data } = await api.put<Note>(`${SERVER_NOTE_PATH}/${noteId}`, note);
    return data;
  } catch (error) {
    return null;
  }
}
