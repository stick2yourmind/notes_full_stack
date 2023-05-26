import axios from 'axios';
import { SERVER_BASE_URL } from '../data/constants';

export default axios.create({
  baseURL: SERVER_BASE_URL,
});
