import axios from 'axios';
import { getDecryptedData } from '../globalStore/cryptoUtils/cryptoUtil';

axios.defaults.baseURL = 'http://192.168.1.130:8098/';

axios.interceptors.request.use(
 config => {
  const token = getDecryptedData('token');
  const isTokenAvailable = !!token;
  if (isTokenAvailable) {
   config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
 },
 error => {
  return Promise.reject(error);
 },
);

axios.interceptors.response.use(
 response => {
  return response;
 },
 error => {
  console.log('interceptors : ', error);
  if (error?.response?.status === 401) {
   //  window.location.href = '/login';
  }
  return Promise.reject(error);
 },
);

export default axios;
