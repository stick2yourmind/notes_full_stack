import { NOTE_BASE_URL } from '@/data/constants';
import { Request } from '@/utils/request';
import { RequestConstructor } from '@/utils/request.types';
import { AxiosRequestConfig } from 'axios';

class NoteRequest extends Request{
  constructor({baseUrl}:RequestConstructor){
    super({baseUrl});
  }

  async getActiveNotes<T>(config?: AxiosRequestConfig) {
    try {
      const { data: responseData } = await this.api.get<T>(
        '/active', 
        config
      );
      return responseData;
    } catch (error) {
      throw null;
    }
  }

  async getArchivedNotes<T>(config?: AxiosRequestConfig) {
    try {
      const { data: responseData } = await this.api.get<T>(
        '/archive', 
        config
      );
      return responseData;
    } catch (error) {
      throw null;
    }
  }

  async activeNote<T>(noteId:number,config?: AxiosRequestConfig) {
    try {
      
      const { data:responseData } = await this.api.patch<T>(
        `/${noteId}`, 
        { archived: false },
        config
      );
      return responseData;
    } catch (error) {
      throw null;
    }
  }

  async archiveNote<T>(noteId:number,config?: AxiosRequestConfig) {
    try {
      
      const { data:responseData } = await this.api.patch<T>(
        `/${noteId}`, 
        { archived: true },
        config
      );
      return responseData;
    } catch (error) {
      throw null;
    }
  }
  
}

export const noteService = new NoteRequest({baseUrl: NOTE_BASE_URL});
