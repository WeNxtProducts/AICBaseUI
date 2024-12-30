import React, { useEffect, useState } from 'react'
import PayForm from './PayForm';

const paymentMethods = [
    { value: 'P', label: 'Cash' },
    { value: 'C', label: 'Cheque' },
    { value: 'CC', label: 'Credit Card' },
    { value: 'AD', label: 'Bank Transfer' },
];

const initialForm = {
    RD_PAY_MODE: 'P',
    RD_FC_AMT: '',
    RD_LC_AMT: '',

    RD_BANK_REF_NO: '',
    RD_CHQ_BANK_CODE: '',

    RD_CHQ_NO: '',
    RD_CHQ_DT: '',

    PD_BANK_NAME: '',
    PD_CC_NO: '',
    PD_CVV_NO: '',
    PD_CC_EXP_DT: '',

    RD_CUST_BANK_ACNT_NO: '',
    RD_BANK_IFSC_CODE: '',
    RD_BANK_ACNT_NAME: '',
};

const PaymentModes = ({ surrMatValues }) => {
    const { SMV_FC_NET_PAID_AMT, SMV_LC_NET_PAID_AMT } = surrMatValues
    const [mainValue, setMainValue] = useState(null);

    useEffect(() => {
        const initValue = {
            ...initialForm,
            RD_FC_AMT: SMV_FC_NET_PAID_AMT,
            RD_LC_AMT: SMV_LC_NET_PAID_AMT,
        }
        setMainValue(initValue);
    }, []);

    const handleSaveOrUpdate = values => {
        console.log("values : ", values)
    }

    const approveReceipt = () => {
        console.log("approveReceipt");
    }

    return (
        <div className='payment_modes mt-4'>
            <fieldset>
                <legend>Payment Details</legend>
                {mainValue !== null &&
                    <PayForm
                        options={paymentMethods}
                        currentValue={mainValue}
                        handleSaveOrUpdate={handleSaveOrUpdate}
                        approveReceipt={approveReceipt}
                    />
                }
            </fieldset>
        </div>
    )
}

export default PaymentModes
