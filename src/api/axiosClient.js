import axios from 'axios';
import queryString from 'query-string';

import apiConfig from './config';

axios.defaults.baseURL = apiConfig.baseUrl;

axios.interceptors.request.use(
  (config) => {
    config.headers.Authorization = 'Content-Type: ';
    config.paramsSerializer = (params) =>
      queryString.stringify({ ...params, api_key: apiConfig.apiKey });
    return config;
  },
  (err) => Promise.reject(err)
);

axios.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    throw error;
  }
);

export default axios;
