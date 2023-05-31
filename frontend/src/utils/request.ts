import { api } from '@/services/api';
import { AxiosInstance, AxiosRequestConfig } from 'axios';
import { RequestConstructor } from './request.types';

export class Request {
  api: AxiosInstance ;
  constructor({baseUrl}:RequestConstructor){
    if(baseUrl === '')
      throw new Error('base url not provided');
    this.api = api(baseUrl);
  }

  async get<T>({config}:{config?:AxiosRequestConfig}) {
    try {
      const { data: responseData } = await this.api.get<T>(
        config?.url || '/', 
        config
      );
      return responseData;
    } catch (error) {
      throw null;
    }
  }

  async getById<T>(getId: number, config?: AxiosRequestConfig) {
    try {
      const { data: responseData } = await this.api.get<T>(
        `/${getId}`, 
        config
      );
      return responseData;
    } catch (error) {
      throw null;
    }
  }

  async deleteById<T>(deleteId: number, config?: AxiosRequestConfig) {
    try {
      const { data: responseData } = await this.api.delete<T>(
        `/${deleteId}`, 
        config
      );
      return responseData;
    } catch (error) {
      throw null;
    }
  }

  async post<T,K>({data, config}:{data: K, config?: AxiosRequestConfig}) {
    try {
      const { data: responseData } = await this.api.post<T>(
        '', 
        data, 
        config
      );
      return responseData;
    } catch (error) {
      throw null;
    }
  }

  async put<T,K>({editId, data, config}:{editId:number,data: K, config?: AxiosRequestConfig}) {
    try {
      const { data: responseData } = await this.api.put<T>(
        `/${editId}`, 
        data, 
        config
      );
      return responseData;
    } catch (error) {
      throw null;
    }
  }

  async patch<T,K>(data: K, config?: AxiosRequestConfig) {
    try {
      const { data: responseData } = await this.api.patch<T>(
        '/', 
        data, 
        config
      );
      return responseData;
    } catch (error) {
      throw null;
    }
  }
}

