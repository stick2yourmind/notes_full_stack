import { Note } from '../components';
import api from './api';

export async function getActiveNotes() {
  try {
    const { data } = await api.get<Note[]>('/note/active');
    return data;
  } catch (error) {
    return null;
  }
}
