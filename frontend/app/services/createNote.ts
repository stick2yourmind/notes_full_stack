import { Note } from '../components';
import { SERVER_NOTE_PATH } from '../data/constants';
import api from './api';

export async function createNote(note: Pick<Note, 'title' | 'description'>) {
  try {
    const { data } = await api.post<Note>(`${SERVER_NOTE_PATH}`, note);
    return data;
  } catch (error) {
    return null;
  }
}
