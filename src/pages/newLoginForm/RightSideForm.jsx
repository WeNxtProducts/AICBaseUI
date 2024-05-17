import { useEffect, useState } from 'react';
import { Input, Select } from 'antd';
import LanguageSelectField from '../../components/customFieldComponents/languageSelectField/LanguageSelectField';
import { fruitsOptions } from '../../components/tableComponents/sampleData';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useApiRequests from '../../services/useApiRequests';
import { Formik, Form, ErrorMessage } from 'formik';
import { loginValidationSchema } from '../../schemaValidations/loginValidation';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { storeEncryptedData } from '../../globalStore/cryptoUtils/cryptoUtil';
import {
 setGroupId,
 setToken,
 setUserDetails,
} from '../../globalStore/slices/TokenAndMenuList';
import ForgotPassword from '../forgotPassword/ForgotPassword';
import showNotification from '../../components/notification/Notification';

const RightSideForm = () => {
 const navigate = useNavigate();
 const dispatch = useDispatch();
 const loginApi = useApiRequests('login', 'POST');
 const getCompList = useApiRequests('getCompList', 'POST');
 const getBranchList = useApiRequests('getBranchList', 'POST');
 const getDeptList = useApiRequests('getDept', 'POST');
 const getLangList = useApiRequests('getLang', 'POST');
 const [showPassword, setShowPassword] = useState(false);
 const [dropDowns, setDropDowns] = useState({
  languageList: [],
  companyList: [],
  branchList: [],
  deptList: [],
 });
 const initialValues = {
  userName: '',
  password: '',
  companyCode: '',
  divisionCode: '',
  departmentCode: '',
  langCode: '',
 };
 const [isModalOpen, setIsModalOpen] = useState(false);

 const showModal = () => setIsModalOpen(true);
 const handleClose = () => setIsModalOpen(false);
 const handleTogglePassword = () => setShowPassword(!showPassword);

 const handleInit = async () => {
  try {
   const [languageList] = await Promise.all([getLangList()]);
   setDropDowns({
    ...dropDowns,
    languageList: languageList?.Data,
   });
  } catch (error) {
   console.error('error : ', error);
  }
 };

 useEffect(() => {
  handleInit();
 }, []);

 const onSubmit = async values => {
  try {
   const response = await loginApi(values);
   storeEncryptedData('token', response?.Data?.Token || response?.Token);
   dispatch(setToken(response?.Data?.Token || response?.Token));
   dispatch(setUserDetails(values));
   dispatch(setGroupId(response?.Data?.group));
   if (response?.Status === 'REDIRECT') {
    navigate(response?.Data?.URL || '/resetpassword');
   } else if (response?.Status === 'SUCCESS') navigate('/dashboard');
   else if (response?.Status === 'FAILURE')
    showNotification.ERROR(response?.status_msg);
  } catch (err) {
   console.error('login error : ', err);
  }
 };

 const handleUserFound = async name => {
  const adminDetail = { userId: name };
  try {
   const response = await getCompList(adminDetail);
   setDropDowns({
    ...dropDowns,
    companyList: response?.Status === 'ERROR' ? [] : response?.Data,
   });
   if (response?.Status === 'ERROR')
    showNotification[response?.Status](response?.Error[0]?.Message);
  } catch (err) {
   console.error('err : ', err);
  }
 };

 const handleBranchCode = async (userId, companyCode) => {
  const adminDetail = { userId, companyCode };
  try {
   const response = await getBranchList(adminDetail);
   setDropDowns({
    ...dropDowns,
    branchList: response?.Status === 'ERROR' ? [] : response?.Data,
   });
  } catch (err) {
   console.error('err : ', err);
  }
 };

 const handleDeptCode = async (userId, companyCode, branchCode) => {
  const adminDetail = { userId, companyCode, branchCode };
  try {
   const response = await getDeptList(adminDetail);
   setDropDowns({
    ...dropDowns,
    deptList: response?.Status === 'ERROR' ? [] : response?.Data,
   });
  } catch (err) {
   console.error('err : ', err);
  }
 };

 return (
  <div className='form-login-new'>
   <Formik
    initialValues={{
     ...initialValues,
     langCode:
      dropDowns?.languageList?.find(option => option.IsDefault === 'True')
       ?.value || '',
    }}
    onSubmit={onSubmit}
    validationSchema={loginValidationSchema}
    values={initialValues}
    enableReinitialize={true}>
    {({ handleSubmit, values, setFieldValue }) => {
     return (
      <Form className='newlogin-formik' onSubmit={handleSubmit}>
       <div className='float-right w-3/5'>
        <LanguageSelectField
         options={dropDowns?.languageList}
         value={17}
         onChange={value => {
          console.log('value :', value);
         }}
        />
       </div>
       <div className='main-forms'>
        <p className='login-new-style'>Login</p>
        <div className='fields mt-5'>
         <Input
          variant='borderless'
          name='userName'
          value={values?.userName}
          className='login-fields'
          placeholder='UserName'
          onChange={e => setFieldValue('userName', e.target.value)}
          onBlur={() => handleUserFound(values?.userName)}
         />
         <ErrorMessage
          name='userName'
          component='div'
          className='error-message'
         />
        </div>

        <div className='password-field fields mt-6'>
         <input
          type={showPassword ? 'text' : 'password'}
          className='login-fields password-login'
          placeholder='Password'
          name='password'
          value={values?.password}
          onChange={e => setFieldValue('password', e.target.value)}
         />
         <button type='button' onClick={() => handleTogglePassword()}>
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
         </button>
         <ErrorMessage
          name='password'
          component='div'
          className='error-message'
         />
        </div>
        <div className='fields mt-6'>
         <Select
          placeholder='Company'
          // disabled={dropDowns?.companyList?.length == 1}
          className='login-fields'
          name='companyCode'
          onChange={value => {
           handleBranchCode(values?.userName, value);
           setFieldValue('companyCode', value);
          }}>
          {dropDowns?.companyList?.map(item => (
           <Select.Option key={item?.value} value={item?.value}>
            {`${item?.value} - ${item?.label}`}
           </Select.Option>
          ))}
         </Select>
         <ErrorMessage
          name='companyCode'
          component='div'
          className='error-message'
         />
        </div>
        <div className='fields mt-6 flex'>
         <div className='fields w-1/2 mr-3'>
          <Select
           placeholder='Branch'
           // disabled={dropDowns?.branchList?.length == 0}
           className='login-fields'
           name='divisionCode'
           onChange={value => {
            handleDeptCode(values?.userName, values?.companyCode, value);
            setFieldValue('divisionCode', value);
           }}>
           {dropDowns?.branchList?.map(item => (
            <Select.Option key={item?.value} value={item?.value}>
             {`${item?.value} - ${item?.label}`}
            </Select.Option>
           ))}
          </Select>
          <ErrorMessage
           name='divisionCode'
           component='div'
           className='error-message'
          />
         </div>
         <div className='fields w-1/2'>
          <Select
           placeholder='Department'
           // disabled={dropDowns?.deptList?.length == 0}
           className='login-fields'
           name='departmentCode'
           onChange={value => {
            setFieldValue('departmentCode', value);
           }}>
           {dropDowns?.deptList?.map(item => (
            <Select.Option key={item?.value} value={item?.value}>
             {`${item?.value} - ${item?.label}`}
            </Select.Option>
           ))}
          </Select>
          <ErrorMessage
           name='departmentCode'
           component='div'
           className='error-message'
          />
         </div>
        </div>
        <div className='text-right mt-4'>
         <p onClick={() => showModal()} className='forgetPasswordText'>
          Forget Password?
         </p>
        </div>
        <div className='mt-6'>
         <button type='submit' className='w-full login-button'>
          Login
         </button>
        </div>
       </div>
      </Form>
     );
    }}
   </Formik>
   {isModalOpen && (
    <ForgotPassword open={isModalOpen} handleClose={handleClose} />
   )}
  </div>
 );
};

export default RightSideForm;
