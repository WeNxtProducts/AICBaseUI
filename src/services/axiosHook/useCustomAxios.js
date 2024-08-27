import axios from 'axios';
import { useEffect } from 'react';
import { getDecryptedData, storeEncryptedData } from '../../globalStore/cryptoUtils/cryptoUtil';
import { useDispatch } from 'react-redux';
import {
 setToken,
 setSidebarList,
 setCurrentMenuId,
 setUserDetails,
} from '../../globalStore/slices/TokenAndMenuList';
import { setMenu } from '../../globalStore/slices/MenuSlices';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

axios.defaults.baseURL = import.meta.env.WENXT_BASEURL;

const useCustomAxios = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const token = useSelector(state => state?.tokenAndMenuList?.token);

 useEffect(() => {
  //   const token = getDecryptedData('token');
  const isTokenAvailable = !!token;
  const noAuthEndpoints = ['auth/getLang'];
  const requestInterceptor = axios.interceptors.request.use(
   config => {
    console.log('useEffect  : ', config.url);
    if (isTokenAvailable && !noAuthEndpoints.includes(config.url)) {
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
     //  showNotification.WARNING('Session has expired');
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
