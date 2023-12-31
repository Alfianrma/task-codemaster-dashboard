import axios from 'axios';
export const services = axios.create({
  baseURL: 'https://eduapi.dv.harrymahardhika.com/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

services.interceptors.request.use(
  async config => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    } catch (errorConfig) {
      return Promise.reject(errorConfig);
    }
  },
  error => {
    return Promise.reject(error);
  }
);

services.interceptors.response.use(async response => {
  return response.data;
});

export { default as useAuth } from './useAuth';
export { default as useStudent } from './useStudent';
export { default as usePayment } from './usePayment';
export { default as useCourse } from './useCourse';
export { default as useStatistics } from './useStatistics';
