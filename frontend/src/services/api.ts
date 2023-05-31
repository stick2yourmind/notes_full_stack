import axios from 'axios';

export const api = (baseUrl:string) => (
  axios.create({
    baseURL:baseUrl
  })
);