import { useCallback } from 'react';
import { debounce } from 'lodash';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../notification/Notification';

const useParamLov = () => {
 const getParamLov = useApiRequests('getParamLov', 'GET');

 const handleSearch = async (paramId, val, parameter = {}) => {
  try {
   const response = await getParamLov('', {
    queryId: paramId,
    searchTerm: val,
    ...parameter,
   });

   if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
    return null;
   } else if (response?.status === 'SUCCESS') {
    return response;
   }
  } catch (err) {
   return null;
  }
 };

 const onSearch = async (paramId, val, parameter = {}) => {
  const result = await handleSearch(paramId, val, parameter);
  return result;
 };

 return { onSearch };
};

export default useParamLov;
