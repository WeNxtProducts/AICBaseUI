import React, { useEffect, useState } from 'react';
import { formatNumber } from '../../../../../../components/commonHelper/CurrentFormatter';
import useApiRequests from '../../../../../../services/useApiRequests';
import showNotification from '../../../../../../components/notification/Notification';

const PremiumView = ({ policyNumber, dataLoaded }) => {
    const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
    const [premDetails, setPremDetails] = useState(null);

    const handleGetPremiumDetails = async () => {
        try {
            const response = await getMapQuery({ queryParams: { POL_NO: policyNumber } }, { queryId: 221 });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                setPremDetails(response?.Data[0]);
            }
        } catch (err) {
            console.log('err : ', err);
        }
    };

    useEffect(() => {
        if (policyNumber) {
            // console.log("policyNumber : ", policyNumber)
            handleGetPremiumDetails();
        }
    }, [policyNumber])

    const renderPremiums = (label, fc = 0, lc = 0) => (
        <div className='w-full flex mt-2'>
            <div className='w-2/5'>
                <p className='label-style'>{label}</p>
            </div>
            <div className='w-1/4 flex justify-end'>
                <p className='value-style pre_style'>{formatNumber(fc)}</p>
            </div>
            <div className='w-1/4 flex justify-end'>
                <p className='value-style pre_style'>{formatNumber(lc)}</p>
            </div>
        </div>
    );

    return (
        <div className='premiumDetails p-3'>
            <p>Premium Details</p>
            <div className='details'>
                {premDetails !== null && (
                    <div className='details'>
                        <div className='w-full flex'>
                            <div className='w-2/5'></div>
                            <div className='w-1/4 flex justify-center ml-8'>
                                <p className='fc_lc-style'>FC</p>
                            </div>
                            <div className='w-1/4 flex justify-center'>
                                <p className='fc_lc-style'>LC</p>
                            </div>
                        </div>
                        {renderPremiums(
                            'Basic Premium',
                            premDetails?.POL_FC_BASIC_PREM,
                            premDetails?.POL_LC_BASIC_PREM,
                        )}
                        {renderPremiums(
                            'Total Rider Premium',
                            premDetails?.POL_FC_ADDL_PREM,
                            premDetails?.POL_LC_ADDL_PREM,
                        )}
                        {renderPremiums(
                            'Total Loading',
                            premDetails?.POL_FC_EXTRA_PREM,
                            premDetails?.POL_LC_EXTRA_PREM,
                        )}
                        {renderPremiums('Total Discount', premDetails?.POL_FC_DISC, premDetails?.POL_LC_DISC)}
                        {renderPremiums('Charges', premDetails?.POL_FC_CHARGE, premDetails?.POL_LC_CHARGE)}
                    </div>
                )}
            </div>
        </div>
    );
};

export default PremiumView;
