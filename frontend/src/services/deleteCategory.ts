import { SERVER_CATEGORY_PATH } from '../data/constants';
import { Category } from '../data/types';
import api from './api';

export async function deleteCategory(categoryId:number) {
  try {
    const { data } = await api.delete<Category[]>(`${SERVER_CATEGORY_PATH}/${categoryId}`);
    return data;
  } catch (error) {
    return null;
  }
}
