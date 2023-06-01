import { Note } from '@/data/types';
import { Dispatch, SetStateAction } from 'react';

export type CategorySelectorProps = {
  callback: Dispatch<SetStateAction<number[]>>,
  selectedCategories: Note['categories']
}