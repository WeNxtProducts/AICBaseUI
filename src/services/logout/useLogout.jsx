import useApiRequests from '../useApiRequests';
import { useDispatch } from 'react-redux';
import {
 setToken,
 setSidebarList,
 setCurrentMenuId,
 setUserDetails,
} from '../../globalStore/slices/TokenAndMenuList';
import { setMenu } from '../../globalStore/slices/MenuSlices';
import { storeEncryptedData } from '../../globalStore/cryptoUtils/cryptoUtil';

const useLogout = () => {
 const dispatch = useDispatch();
 const logout = useApiRequests('logout', 'POST');

 const handleLogout = async () => {
  try {
   const response = await logout();
   if (response?.Status === 'SUCCESS') {
    storeEncryptedData('token', '');
    dispatch(setMenu([]));
    dispatch(setToken(''));
    dispatch(setSidebarList([]));
    dispatch(setCurrentMenuId({}));
    dispatch(setUserDetails({}));
    return true;
   } else return false;
  } catch (err) {
   return false;
  }
 };

 return handleLogout;
};

export default useLogout;
