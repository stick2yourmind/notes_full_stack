import { Note } from '@/data/types';

export type CreateEditModalProps = {
  mode: 'Edit' | 'Create';
  previous: {
    description: Note['description'],
    title: Note['title'],
    id: Note['id'],
    archived: Note['archived'],
    categories: Note['categories']
  } | null;
};

export type FormData = {
  Title: string;
  Description: string;
};