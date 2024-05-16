// import axios from "./apiInterceptors";
import { API_CONFIG } from './apiUrlMethods/apiUrls';
import useCustomAxios from './axiosHook/useCustomAxios';

const useApiRequests = (apiName, method) => {
 const axiosInstance = useCustomAxios();
 const api = API_CONFIG[apiName];

 const apiCalls = async (
  payload = null,
  queryParams = {},
  pathParams = {},
  header = {},
 ) => {
  return new Promise(async (resolve, reject) => {
   let url = api?.url;

   try {
    if (Object.keys(pathParams).length > 0)
     url += `/${Object.values(pathParams).join('/')}`;

    if (Object.keys(queryParams).length > 0) {
     const convertObjectToQueryString = obj => {
      const queryParams = new URLSearchParams();
      for (const key in obj) {
       if (typeof obj[key] === 'object')
        queryParams.append(key, JSON.stringify(obj[key]));
       else queryParams.append(key, String(obj[key]));
      }
      return queryParams.toString();
     };
     url += `?${convertObjectToQueryString(queryParams)}`;
    }

    const response = await axiosInstance({
     method: method,
     url: url,
     data: payload,
     headers: header,
    });

    resolve(response.data);
   } catch (error) {
    reject(error);
   }
  });
 };

 return apiCalls;
};

export default useApiRequests;
