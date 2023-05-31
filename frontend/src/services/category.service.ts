import { CATEGORY_BASE_URL } from '@/data/constants';
import { Request } from '@/utils/request';
import { AxiosRequestConfig } from 'axios';
import { RequestConstructor } from '@/utils/request.types';

class CategoryRequest extends Request{
  constructor({baseUrl}:RequestConstructor){
    super({baseUrl});
  }

  async getNotesByCategory<T>(categoryId: number, config?: AxiosRequestConfig) {
    try {
      const { data: responseData } = await this.api.get<T>(
        `/category/${categoryId}/notes`, 
        config
      );
      return responseData;
    } catch (error) {
      throw null;
    }
  }
}

export const categoryService = new CategoryRequest({baseUrl: CATEGORY_BASE_URL});