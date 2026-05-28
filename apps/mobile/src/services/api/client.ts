import axios from 'axios';

import { getApiBaseUrl } from '@/config/api';

export const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});
