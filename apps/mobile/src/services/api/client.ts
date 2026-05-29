import axios from 'axios';

import { getApiBaseUrl } from '@/config/api';

const baseURL = getApiBaseUrl();

if (__DEV__) {
  console.log('[AI Coach] API:', baseURL);
}

export const api = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});
