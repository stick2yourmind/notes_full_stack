import { Note } from '../data/types';
import api from './api';

export async function getActiveNotes(abortController:AbortController) {
  try {
    const { data } = await api.get<Note[]>('/note/active', {
      signal: abortController.signal
    });
    return data;
  } catch (error) {
    return null;
  }
}
