import { Note } from '../components';

export const initialNote: Pick<Note, 'archived' | 'description' | 'title'> = {
  archived: false,
  description: '',
  title: '',
};
