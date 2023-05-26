import { SERVER_CATEGORY_PATH } from '../data/constants';
import { Category } from '../data/types';
import api from './api';

export async function getCategories(abortController: AbortController) {
  try {
    const { data } = await api.get<Category[]>(`${SERVER_CATEGORY_PATH}`,{
      signal: abortController.signal
    });
    return data;
  } catch (error) {
    return null;
  }
}
