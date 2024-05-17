import axios from 'axios';
import { useEffect } from 'react';
import {
 getDecryptedData,
 storeEncryptedData,
} from '../../globalStore/cryptoUtils/cryptoUtil';
import { useDispatch } from 'react-redux';
import {
 setToken,
 setSidebarList,
 setCurrentMenuId,
 setUserDetails,
} from '../../globalStore/slices/TokenAndMenuList';
import { setMenu } from '../../globalStore/slices/MenuSlices';
import showNotification from '../../components/notification/Notification';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = 'http://192.168.1.150:8098/';

const useCustomAxios = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();

 useEffect(() => {
  const token = getDecryptedData('token');
  const isTokenAvailable = !!token;
  const requestInterceptor = axios.interceptors.request.use(
   config => {
    if (isTokenAvailable) {
     config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
   },
   error => {
    return Promise.reject(error);
   },
  );

  const responseInterceptor = axios.interceptors.response.use(
   response => {
    return response;
   },
   error => {
    if (error?.response?.status === 401) {
     storeEncryptedData('token', '');
     dispatch(setMenu([]));
     dispatch(setToken(''));
     dispatch(setSidebarList([]));
     dispatch(setCurrentMenuId({}));
     dispatch(setUserDetails({}));
     //  setTimeout(() => {
     //   window.location.href = '/login';
     //   navigate('/login');
     //  }, 2000);
     navigate('/login');
     showNotification.WARNING('Session has expired');
    }
    return Promise.reject(error);
   },
  );

  return () => {
   axios.interceptors.request.eject(requestInterceptor);
   axios.interceptors.response.eject(responseInterceptor);
  };
 }, []);

 return axios;
};

export default useCustomAxios;
