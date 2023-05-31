import { Note } from './types';

export const initialNote: Pick<Note, 'archived' | 'description' | 'title'> = {
  archived: false,
  description: '',
  title: '',
};
