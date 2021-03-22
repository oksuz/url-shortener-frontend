import axios from 'axios';
import config from '../config';

const http = axios.create({
  baseURL: config.API_URL,
  timeout: 30 * 1000,
  headers: {
    common: {
      'x-api-version': 1
    }
  }
});

export default http;
