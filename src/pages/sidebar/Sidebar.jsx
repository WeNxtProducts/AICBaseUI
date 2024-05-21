import { useEffect, useState } from 'react';
import SidebarItem from './SidebarItem';
import weNxtLogo from '../../assets/WeNxt_Logo-removebg.png';
import { useDispatch, useSelector } from 'react-redux';
import useApiRequests from '../../services/useApiRequests';
import { setSidebarList } from '../../globalStore/slices/TokenAndMenuList';
import './Sidebar.scss';
import Loader from '../../components/loader/Loader';

export default function Sidebar() {
 const dispatch = useDispatch();
 const [isExpanded, setIsExpanded] = useState(false); // change to false
 const menuList = useSelector(state => state?.tokenAndMenuList?.sidebarList);
 const groupId = useSelector(state => state?.tokenAndMenuList?.groupId);
 const menuListAPI = useApiRequests('getMenuList', 'GET');
 const [loader, setLoader] = useState(false);

 const handleMenuList = async () => {
  setLoader(true);
  try {
   const response = await menuListAPI('', { groupId });
   dispatch(setSidebarList(response?.Data));
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 useEffect(() => {
  if (menuList?.length === 0) handleMenuList();
 }, []);

 if (menuList?.length === 0) return <Loader />;

 return (
  <div
   className='sidebar'
   style={{
    width: isExpanded ? '15%' : '3.8%',
   }}
   onMouseEnter={() => setIsExpanded(true)}
   onMouseLeave={() => setIsExpanded(false)} // change to false
  >
   <div className='sidebar-Header flex justify-between sticky top-0 mb-2'>
    <div>
     <img className='logo-resize p-1' alt='logo' src={weNxtLogo} />
    </div>
    {isExpanded && (
     <div className='flex items-center pr-4'>
      <i className='bi bi-tools tools-icon'></i>
     </div>
    )}
   </div>
   {menuList?.length > 0 &&
    menuList?.map((item, index) => (
     <SidebarItem key={index} item={item} isExpanded={isExpanded} />
    ))}
  </div>
 );
}
