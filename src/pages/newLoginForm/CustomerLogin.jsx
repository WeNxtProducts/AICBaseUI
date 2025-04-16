import React, { useState } from 'react'
import phoneSMS from '../../assets/TextSMS.png'
import mailSMS from '../../assets/MailSMS.png'
import userIdImg from '../../assets/userIdOTP.png'
import OTPIcon from '../../assets/OTP.png'
import CustomRadioButton from '../../components/customRadioButton/CustomRadioButton'
import { contactOptions } from '../../components/tableComponents/sampleData'
import { Button, Input } from 'antd'
import PhoneInput from '../../components/phoneInput/PhoneInput'
import CustomInput from '../../components/customFieldComponents/customInput/CustomInput'
import { ArrowLeftOutlined } from '@ant-design/icons'
import useApiRequests from '../../services/useApiRequests'
import Loader from '../../components/loader/Loader'
import showNotification from '../../components/notification/Notification'
import { storeEncryptedData } from '../../globalStore/cryptoUtils/cryptoUtil'
import { setGroupId, setToken, setUserDetails } from '../../globalStore/slices/TokenAndMenuList'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setRulesJSON } from '../../globalStore/slices/RulesSlices'
import SessionMaintainModal from './SessionMaintainModal'

const dummyFormdata = {
    "userName": "CLJO",
    "password": "Test@123",
    "companyCode": "001",
    "divisionCode": "101",
    "departmentCode": "10101",
    "langCode": "English"
}
const contactImg = {
    u: { img: userIdImg, text: 'Email' },
    p: { img: phoneSMS, text: 'Phone Number' },
    e: { img: mailSMS, text: 'Email' }
}

const CustomerLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const sessionMaintain = useApiRequests('sessionMaintain', 'POST');
    const loginApi = useApiRequests('login', 'POST');
    const getRulesJSON = useApiRequests('getRulesJSON', 'POST');
    const [SessionModal, setSessionModal] = useState(false);
    const [loginData, setLoginData] = useState(dummyFormdata);
    const [loader, setLoader] = useState(false);
    const [OTPsent, setOTPSent] = useState(false)
    const [contactMethod, setContactMethod] = useState('u');
    const [phoneValue, setPhoneValue] = useState('');

    const handleContactMethodChange = (value) => {
        setContactMethod(value);
    };

    const handleGetRules = async (userId) => {
        setLoader(true);
        try {
            const response = await getRulesJSON({ userId });
            if (response?.status === 'SUCCESS') {
                dispatch(setRulesJSON(response?.Data));
                navigate('/dashboard')
            } else if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            }
        } catch (err) {
            console.error('err : ', err);
        } finally {
            setLoader(false);
        }
    };

    const onSubmit = async values => {
        setLoader(true);
        try {
            const response = await loginApi(values);
            if (response?.status === 'REDIRECT') {
                navigate(response?.Data?.URL || '/resetpassword');
            } else if (response?.status === 'SUCCESS') {
                storeEncryptedData('token', response?.Data?.Token || response?.Token);
                dispatch(setToken(response?.Data?.Token || response?.Token));
                dispatch(setUserDetails(values));
                dispatch(setGroupId(response?.Data?.group));
                handleGetRules(values?.userName)
            }
            else if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            else if (response?.status === 'WARN') {
                setLoginData(values);
                setSessionModal(true);
            }
        } catch (err) {
            console.error('login error : ', err);
        } finally {
            setLoader(false);
        }
    };

    const handleYes = async () => {
        try {
            const response = await sessionMaintain({
                userName: loginData?.userName,
            });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                showNotification.SUCCESS(response?.status_msg);
                onSubmit(loginData);
            }
        } catch (err) {
            console.error('err : ', err);
        }
    };

    const handleNo = () => {
        setSessionModal(false);
    };

    const handlePhoneChange = (value) => {
        setPhoneValue(value);
    };

    const sharedProps = {
        size: 'large',
        placeholder: 'Enter OTP',
        onChange: e => {
            console.log("e.target.value : ", e.target.value)
        }
    };

    return (
        <div className='form-login-new'>
            {loader && <Loader />}
            <div className='customer_login'>
                {!OTPsent ? (
                    <div className='before_otp'>
                        <img className='img_src' src={contactImg[contactMethod]?.img} alt='OTP Type' />
                        <div className='mt-10'>
                            <CustomRadioButton
                                options={contactOptions}
                                selectedValue={contactMethod}
                                onChange={handleContactMethodChange}
                                name="contactMethod"
                            />
                            {contactMethod === 'u' &&
                                <div className='mt-5'>
                                    <p className='mb-1 text-sm text-gray-500'>User Name</p>
                                    <CustomInput
                                        placeholder='Username'
                                        value={''}
                                        size='large'
                                        onChange={e => {
                                            console.log("e.target.value : ", e.target.value)
                                        }}
                                    />
                                </div>
                            }
                            {contactMethod === 'p' &&
                                <div className='mt-5'>
                                    <p className='mb-1 text-sm text-gray-500'>Phone Number</p>
                                    <PhoneInput
                                        value={phoneValue}
                                        onChange={handlePhoneChange}
                                        defaultCountryCode="+1"
                                    />
                                </div>
                            }
                            {contactMethod === 'e' &&
                                <div className='mt-5'>
                                    <p className='mb-1 text-sm text-gray-500'>Email</p>
                                    <CustomInput
                                        placeholder='Email'
                                        value={''}
                                        size='large'
                                        onChange={e => {
                                            console.log("e.target.value : ", e.target.value)
                                        }}
                                    />
                                </div>
                            }
                            <div className='mt-10 flex justify-center'>
                                <Button
                                    onClick={() => setOTPSent(true)}
                                    className='send_code_btn'>Send Code</Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='after_otp'>
                        <div
                            onClick={() => setOTPSent(false)}
                            className="flex items-center space-x-2 group cursor-pointer">
                            <ArrowLeftOutlined className="h-3 w-3 text-blue-600 group-hover:text-blue-800" />
                            <span className="text-blue-600 group-hover:text-blue-800 group-hover:underline">Back</span>
                        </div>
                        <div className='otp_div_img'>
                            <img className='img_src' src={OTPIcon} alt='OTP Type' />
                        </div>
                        <div className='mt-2 flex flex-col justify-center items-center'>
                            <p className='text-lg font-semibold text-gray-900 text-center'>Enter OTP Code</p>
                            <p className='text-sm text-gray-500'>OTP sent to your {contactImg[contactMethod]?.text}</p>
                            <p className='text-sm text-gray-500 mb-5'>abc@mail.com</p>
                            <Input.OTP formatter={str => str.toUpperCase()} {...sharedProps} />
                        </div>
                        <div className='mt-10 flex justify-center'>
                            <Button
                                onClick={() => onSubmit(dummyFormdata)}
                                className='send_code_btn'>Verify Code</Button>
                        </div>
                    </div>
                )}

            </div>
            {SessionModal && (
                <SessionMaintainModal open={SessionModal} onConfirm={handleYes} onCancel={handleNo} />
            )}
        </div>
    )
}

export default CustomerLogin