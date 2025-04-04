import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import payFinish from '../../../assets/PayFinish.png';
import { useDispatch } from 'react-redux';
import { clearQuote } from '../../../globalStore/slices/QuoteSlice';


const PaymentConfirmPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => prev - 1);
        }, 1000);

        if (countdown === 0) {
            dispatch(clearQuote())
            clearInterval(timer);
            navigate('/login');
        }

        return () => clearInterval(timer);
    }, [countdown, navigate]);

    return (
        <div className='PaymentConfirmPage'>
            <img src={payFinish} alt="Pay Finish" />
            <p className='PaymentConfirmPage__text'>Thank you for the Payment</p>
            <p className='PaymentConfirmPage__sub_text'>You will be redirected to Log In screen in</p>
            <p className='PaymentConfirmPage__redirect_text'>{countdown} seconds</p>
            <p
                className='PaymentConfirmPage__create_another'
                onClick={() => {
                    dispatch(clearQuote())
                    navigate('/quoteProducts')
                }}
            >Create another Quote</p>
        </div>
    );
};

export default PaymentConfirmPage;
