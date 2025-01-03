import React, { useContext } from 'react';
import { personaldetails } from '../../../components/tableComponents/sampleData';
import { UWContext } from '../UnderWriterWorkBench';
import dayjs from 'dayjs';
import { formatNumber } from '../../../components/commonHelper/CurrentFormatter';

const PersonalDetailsUnderWriter = () => {
    const { policyDetails = {} } = useContext(UWContext);
    const {
        POL_ASSURED_NAME = '',
        POL_MODE_OF_PYMT = '',
        POL_FM_DT = '',
        POL_TO_DT = '',
        POL_LC_SA = '',
        POL_PERIOD = '',
        POL_PREM_PAY_YRS = '',
        POLICY_PREM = 0,
        DEP_RECVD = 0
    } = policyDetails;

    return (
        <div className='personal-details mt-4 p-3'>
            <p>Policy Details</p>
            <div className='details mt-2'>
                <div className='w-full flex items-center'>
                    <div className='w-2/5'>
                        <p className='label-style'>Assured Name</p>
                    </div>
                    <div className='w-3/5'>
                        <p className='value-style'>{POL_ASSURED_NAME}</p>
                    </div>
                </div>

                <div className='w-full flex items-center'>
                    <div className='w-2/5'>
                        <p className='label-style'>Mode of Payment</p>
                    </div>
                    <div className='w-3/5'>
                        <p className='value-style'>{POL_MODE_OF_PYMT}</p>
                    </div>
                </div>

                <div className='w-full flex items-center'>
                    <div className='w-2/5'>
                        <p className='label-style'>Policy From Date</p>
                    </div>
                    <div className='w-3/5'>
                        <p className='value-style'>{dayjs(POL_FM_DT).format('DD-MM-YYYY')}</p>
                    </div>
                </div>

                <div className='w-full flex items-center'>
                    <div className='w-2/5'>
                        <p className='label-style'>Policy To Date</p>
                    </div>
                    <div className='w-3/5'>
                        <p className='value-style'>{dayjs(POL_TO_DT).format('DD-MM-YYYY')}</p>
                    </div>
                </div>

                <div className='w-full flex items-center'>
                    <div className='w-2/5'>
                        <p className='label-style'>Sum Assured</p>
                    </div>
                    <div className='w-3/5'>
                        <p className='value-style'>{formatNumber(POL_LC_SA)}</p>
                    </div>
                </div>

                <div className='w-full flex items-center'>
                    <div className='w-2/5'>
                        <p className='label-style'>Policy Period</p>
                    </div>
                    <div className='w-3/5'>
                        <p className='value-style'>{POL_PERIOD}</p>
                    </div>
                </div>

                <div className='w-full flex items-center'>
                    <div className='w-2/5'>
                        <p className='label-style'>Premium Paying Years</p>
                    </div>
                    <div className='w-3/5'>
                        <p className='value-style'>{POL_PREM_PAY_YRS}</p>
                    </div>
                </div>

                <div className='w-full flex items-center'>
                    <div className='w-2/5'>
                        <p className='label-style'>Policy Premium</p>
                    </div>
                    <div className='w-3/5'>
                        <p className='value-style'>{formatNumber(POLICY_PREM)}</p>
                    </div>
                </div>

                <div className='w-full flex items-center'>
                    <div className='w-2/5'>
                        <p className='label-style'>Deposit Premium</p>
                    </div>
                    <div className='w-3/5'>
                        <p className='value-style'>{formatNumber(DEP_RECVD)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PersonalDetailsUnderWriter;
