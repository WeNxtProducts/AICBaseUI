import React, { useEffect, useState } from 'react';
import ResetPasswordIcon from '../../svg/ResetSVG';
import { Button } from 'antd';
import CustomFloatInput from '../../components/customFieldComponents/customFloatInput/CustomFloatInput';
import { useSelector } from 'react-redux';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../../components/notification/Notification';
import { useLocation, useNavigate } from 'react-router-dom';
import useLogout from '../../services/logout/useLogout';
import './ResetPassword.scss';

const ResetPassword = () => {
 const resetPaths = ['/resetpassword_profile'];
 const navigate = useNavigate();
 const location = useLocation();
 const logout = useLogout();
 const resetPassword = useApiRequests('resetPassword', 'POST');
 const userDetails = useSelector(state => state?.tokenAndMenuList?.userDetails);
 const [currentPath, setCurrentPath] = useState(true);
 const [values, setValues] = useState({
  password: '',
  newPassword: '',
  confirmPassword: '',
 });

 useEffect(() => {
  const checkPaths = resetPaths.includes(location.pathname);
  if (!checkPaths) setValues({ ...values, password: userDetails?.password });
  setCurrentPath(checkPaths);
 }, []);

 useEffect(() => {
  document.documentElement.style.setProperty(
   '--reset-password-height',
   `${location?.pathname === '/resetpassword_profile' ? '88vh' : '100vh'}`,
  );
 }, []);

 const handleChange = (val, key) => {
  setValues({
   ...values,
   [key]: val,
  });
 };

 const handleLogout = async () => {
  const success = await logout();
  if (success) {
   navigate('/login');
  } else {
   console.log('Logout failed');
  }
 };

 const handleSubmitForm = async () => {
  if (values?.password === values?.newPassword) {
   showNotification.WARNING('New Password should not be Old Password');
  } else if (values?.newPassword !== values?.confirmPassword) {
   showNotification.WARNING(`New Password and Confirm Password doesn't match`);
  } else if (values?.newPassword === values?.confirmPassword) {
   try {
    const response = await resetPassword('', {
     ...values,
     //  name: userDetails?.userName,
    });
    if (response?.Status === 'FAILURE') showNotification.ERROR(response?.status_msg);
    else if (response?.Status === 'SUCCESS') {
     handleLogout();
    }
   } catch (err) {
    console.log('err  : ', err);
   }
  }
 };

 return (
  <div className='reset-password'>
   <div className='password-reset-fields'>
    <div className='main-content'>
     <p className='pass-reset-style select-none label-font'>Password Reset</p>
     <p className='pass-sub-style mt-1 select-none label-font'>Your New Password should</p>
     <p className='pass-sub-style select-none label-font'>different from old password</p>
     <ResetPasswordIcon className='custom-svg' />
     <div className='form-content'>
      {currentPath && (
       <div className='mt-5'>
        <CustomFloatInput
         value={values?.password}
         onChange={e => handleChange(e.target.value, 'password')}
         id='password'
         label='Old Password'
        />
       </div>
      )}
      <div className='mt-5'>
       <CustomFloatInput
        value={values?.newPassword}
        onChange={e => handleChange(e.target.value, 'newPassword')}
        id='newPassword'
        label='New Password'
       />
      </div>
      <div className='mt-5'>
       <CustomFloatInput
        value={values?.confirmPassword}
        onChange={e => handleChange(e.target.value, 'confirmPassword')}
        id='confirmPassword'
        label='Confirm Password'
       />
      </div>
     </div>
     <Button onClick={() => handleSubmitForm()} className='login-button'>
      Reset Password
     </Button>
    </div>
   </div>
  </div>
 );
};

export default ResetPassword;
