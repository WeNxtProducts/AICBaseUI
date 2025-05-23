import React, { useEffect, useState } from 'react'
import phoneSMS from '../../assets/TextSMS.png'
import mailSMS from '../../assets/MailSMS.png'
import userIdImg from '../../assets/userIdOTP.png'
import OTPIcon from '../../assets/OTP.png'
import CustomRadioButton from '../../components/customRadioButton/CustomRadioButton'
import { contactOptions } from '../../components/tableComponents/sampleData'
import { Button } from 'antd'
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
import OTPInput from '../../components/OTPInput/OTPInput'

const contactImg = {
    u: { img: userIdImg, text: 'Email' },
    p: { img: phoneSMS, text: 'Phone Number' },
    e: { img: mailSMS, text: 'Email' }
}

const CustomerLogin = () => {
    const timerToResend = 60
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const OTPRequest = useApiRequests('OTPRequest', 'POST');
    const OTPVerifyRequest = useApiRequests('OTPVerifyRequest', 'POST');
    const [loader, setLoader] = useState(false);
    const [OTPsent, setOTPSent] = useState(false)
    const [sampleOTPValue, setsampleOTPValue] = useState('')
    const [contactMethod, setContactMethod] = useState('u');
    const [value, setValue] = useState('');
    const [otp, setOtp] = useState('');
    const [timer, setTimer] = useState(timerToResend);
    const [showResend, setShowResend] = useState(false);

    useEffect(() => {
        let interval;
        if (OTPsent && timer > 0) {
            interval = setInterval(() => {
                setTimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {
            setShowResend(true);
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [OTPsent, timer]);

    const handleContactMethodChange = (value) => {
        setValue('');
        setContactMethod(value);
    };

    const handleOTPVerifyRequest = async () => {
        if (otp?.length !== 6) {
            showNotification.WARNING('Please Fill the OTP');
            return
        }
        setLoader(true);
        try {
            const response = await OTPVerifyRequest({
                userName: value, otp
            });
            if (response?.status === 'SUCCESS') {
                storeEncryptedData('token', response?.Data?.Token || response?.Token);
                dispatch(setToken(response?.Data?.Token || response?.Token));
                dispatch(setUserDetails(value));
                dispatch(setGroupId(response?.Data?.group));
                navigate('/customerPolicyList')
            }
            else if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            setLoader(false);
        }
    };

    const onSubmit = async () => {
        if (!value) {
            showNotification.WARNING('Please Fill the Field');
            return
        }
        setLoader(true);
        try {
            const response = await OTPRequest('', { userName: value });
            if (response?.status === 'SUCCESS') {
                setsampleOTPValue(response?.OTP)
                setOTPSent(true)
                setTimer(timerToResend);
                setShowResend(false);
            }
            else if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            setLoader(false);
        }
    };

    const handleValueChange = (value) => {
        setValue(value);
    };

    const handleBack = () => {
        setOTPSent(false)
        setOtp('')
        setsampleOTPValue('')
    }
    const handleOTPComplete = async (otpValue) => {
        setOtp(otpValue)
    }

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
                                        value={value}
                                        size='large'
                                        onChange={e => {
                                            handleValueChange(e.target.value)
                                        }}
                                    />
                                </div>
                            }
                            {contactMethod === 'p' &&
                                <div className='mt-5'>
                                    <p className='mb-1 text-sm text-gray-500'>Phone Number</p>
                                    <PhoneInput
                                        value={value}
                                        onChange={handleValueChange}
                                        defaultCountryCode="+1"
                                    />
                                </div>
                            }
                            {contactMethod === 'e' &&
                                <div className='mt-5'>
                                    <p className='mb-1 text-sm text-gray-500'>Email</p>
                                    <CustomInput
                                        placeholder='Email'
                                        value={value}
                                        size='large'
                                        onChange={e => {
                                            handleValueChange(e.target.value)
                                        }}
                                    />
                                </div>
                            }
                            <div className='mt-10 flex justify-center'>
                                <Button
                                    onClick={() => onSubmit()}
                                    className='send_code_btn'>Send Code</Button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='after_otp'>
                        <div
                            onClick={() => { handleBack() }}
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
                            <OTPInput length={6} onComplete={handleOTPComplete} />
                            <p className='text-sm text-gray-500'>({sampleOTPValue})</p>
                            {!showResend ? (
                                <p className='text-sm text-gray-500'>
                                    Resend OTP in 00:{timer < 10 ? `0${timer}` : timer}
                                </p>
                            ) : (
                                <p
                                    className='text-sm text-blue-600 hover:underline cursor-pointer'
                                    onClick={onSubmit}
                                >
                                    Resend OTP
                                </p>
                            )}
                        </div>
                        <div className='mt-6 flex justify-center'>
                            <Button
                                onClick={() => handleOTPVerifyRequest()}
                                className='send_code_btn'>Verify Code</Button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    )
}

export default CustomerLogin