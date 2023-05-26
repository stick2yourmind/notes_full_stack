import { SERVER_CATEGORY_PATH } from '../data/constants';
import { Category } from '../data/types';
import api from './api';

export async function createCategory(category: Pick<Category, 'title' >) {
  try {
    const { data } = await api.post<Category>(`${SERVER_CATEGORY_PATH}`, category);
    return data;
  } catch (error) {
    return null;
  }
}
