import { SERVER_NOTE_PATH } from '../data/constants';
import { Note } from '../data/types';
import api from './api';

export async function createNote(note: Partial<Note>) {
  try {
    const { data } = await api.post<Note>(`${SERVER_NOTE_PATH}`, note);
    return data;
  } catch (error) {
    return null;
  }
}
