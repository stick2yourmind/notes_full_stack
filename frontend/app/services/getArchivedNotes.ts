import { Note } from '../components';
import api from './api';

export async function getArchivedNotes() {
  try {
    const { data } = await api.get<Note[]>('/note/archive');
    return data;
  } catch (error) {
    return null;
  }
}
