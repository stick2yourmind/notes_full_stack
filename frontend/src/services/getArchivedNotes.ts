import { Note } from '../data/types';
import api from './api';

export async function getArchivedNotes(abortController:AbortController) {
  try {
    const { data } = await api.get<Note[]>('/note/archive',{
      signal:abortController.signal
    });
    return data;
  } catch (error) {
    return null;
  }
}
