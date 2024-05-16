import { useEffect, useRef, useState } from 'react';
import { Avatar, Input, Popover } from 'antd';
import { Badge } from 'antd';
import weNxtLogo from '../../assets/empImage.jpg';
import SubHeader from './SubHeader';
import { useNavigate } from 'react-router-dom';
import useLogout from '../../services/logout/useLogout';
import { useSelector } from 'react-redux';
import './Header.scss';

const Content = ({ width, setOpen }) => {
 const navigate = useNavigate();
 const logout = useLogout();

 const handleNavigate = type => {
  if (type === 'resetPassword') {
   navigate('/resetpassword_profile');
  } else if (type === 'logout') {
   handleLogout();
  }
  setOpen(false);
 };

 const handleLogout = async () => {
  const success = await logout();
  if (success) {
   navigate('/login');
  } else {
   console.log('Logout failed');
  }
 };

 return (
  <div
   style={{ width: `${width}px`, maxHeight: '200px' }}
   className='overflow-y-auto'>
   <ul class='profile-menu-list select-none'>
    <li onClick={() => handleNavigate('resetPassword')}>
     <p>Reset Password</p>
    </li>
    <li onClick={() => handleNavigate('logout')}>
     <p>Logout</p>
    </li>
   </ul>
  </div>
 );
};

const Header = () => {
 const userDetails = useSelector(state => state?.tokenAndMenuList?.userDetails);
 const [open, setOpen] = useState(false);
 const [popoverWidth, setPopoverWidth] = useState(0);
 const inputContainerRef = useRef(null);

 useEffect(() => {
  if (inputContainerRef.current)
   setPopoverWidth(inputContainerRef.current.offsetWidth);
 }, []);

 const handleVisibleChange = visible => {
  setOpen(visible);
 };

 const handleOptions = () => {
  console.log('handleOptions');
 };

 return (
  <header className='header-wrapper'>
   <div className='header'>
    <div className='search-input'>
     <Input
      className='header-Search'
      prefix={<i className='bi bi-search' />}
      placeholder='Search'
     />
    </div>
    <div className='w-1/2 user-actions flex justify-end'>
     <div className='flex items-center'>
      <div className='mr-5 mt-1'>
       <Badge dot>
        <i className='bi bi-envelope-fill icon-header'></i>
       </Badge>
      </div>
      <div className='mr-5'>
       <i className='bi bi-bell-fill icon-header'></i>
      </div>
     </div>
     <Popover
      content={<Content width={popoverWidth} setOpen={setOpen} />}
      placement='bottom'
      trigger='click'
      arrow={false}
      open={open}
      onOpenChange={handleVisibleChange}>
      <div
       ref={inputContainerRef}
       onClick={() => handleOptions()}
       className='flex items-center justify-between profile-options'>
       <div className='flex items-center'>
        <Avatar
         className='profile-header'
         size={64}
         icon={<img alt='logo' src={weNxtLogo} />}
        />
        <p className='pl-2 user-name select-none cursor-pointer'>
         {userDetails?.userName}
        </p>
       </div>
       <i className='bi bi-chevron-compact-down ml-2 icon-header'></i>
      </div>
     </Popover>
     <i className='bi bi-list ml-3 icon-header'></i>
    </div>
   </div>
   {/* <SubHeader /> */}
  </header>
 );
};

export default Header;
