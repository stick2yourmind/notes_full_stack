import axios from 'axios';
import { SERVER_BASE_URL } from '../data/constants';
console.log('🚀 ~ file: api.ts:3 ~ SERVER_BASE_URL:', SERVER_BASE_URL);

export default axios.create({
  baseURL: SERVER_BASE_URL,
});
