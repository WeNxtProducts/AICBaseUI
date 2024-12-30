import React, { useContext, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { EndorsementContext } from '../../Endorsement';
import { formatNumber } from './../../../../components/commonHelper/CurrentFormatter';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';

const PolicyValues = () => {
    const { POL_NO, tranId, policyHistory } = useContext(EndorsementContext);

    return (
        <div className='personal-values p-3'>
            <p>Policy Details</p>
            {policyHistory !== null &&
                <>

                    <div className='details mt-2'>
                        <div className='w-full flex items-center'>
                            <div className='w-2/5'>
                                <p className='label-style'>Policy Number</p>
                            </div>
                            <div className='w-3/5'>
                                <p className='value-style'>{policyHistory?.POL_NO || ''}</p>
                            </div>
                        </div>

                        <div className='w-full flex items-center'>
                            <div className='w-2/5'>
                                <p className='label-style'>Assured Name</p>
                            </div>
                            <div className='w-3/5'>
                                <p className='value-style'>{policyHistory?.POL_ASSURED_NAME || ''}</p>
                            </div>
                        </div>

                        <div className='w-full flex items-center'>
                            <div className='w-2/5'>
                                <p className='label-style'>Mode of Payment</p>
                            </div>
                            <div className='w-3/5'>
                                <p className='value-style'>{policyHistory?.POL_MODE_OF_PYMT || ''}</p>
                            </div>
                        </div>

                        <div className='w-full flex items-center'>
                            <div className='w-2/5'>
                                <p className='label-style'>Policy From Date</p>
                            </div>
                            <div className='w-3/5'>
                                <p className='value-style'>{dayjs(policyHistory?.POL_FM_DT || dayjs()).format('DD-MM-YYYY') || ''}</p>
                            </div>
                        </div>

                        <div className='w-full flex items-center'>
                            <div className='w-2/5'>
                                <p className='label-style'>Policy To Date</p>
                            </div>
                            <div className='w-3/5'>
                                <p className='value-style'>{dayjs(policyHistory?.POL_TO_DT || dayjs()).format('DD-MM-YYYY') || ''}</p>
                            </div>
                        </div>

                        <div className='w-full flex items-center'>
                            <div className='w-2/5'>
                                <p className='label-style'>Sum Assured</p>
                            </div>
                            <div className='w-3/5'>
                                <p className='value-style'>{formatNumber(policyHistory?.POL_LC_SA) || ''}</p>
                            </div>
                        </div>

                        <div className='w-full flex items-center'>
                            <div className='w-2/5'>
                                <p className='label-style'>Policy Period</p>
                            </div>
                            <div className='w-3/5'>
                                <p className='value-style'>{policyHistory?.POL_PERIOD || ''}</p>
                            </div>
                        </div>

                        <div className='w-full flex items-center'>
                            <div className='w-2/5'>
                                <p className='label-style'>Premium Paying Years</p>
                            </div>
                            <div className='w-3/5'>
                                <p className='value-style'>{policyHistory?.POL_PREM_PAY_YRS || ''}</p>
                            </div>
                        </div>

                        <div className='w-full flex items-center'>
                            <div className='w-2/5'>
                                <p className='label-style'>Policy Premium</p>
                            </div>
                            <div className='w-3/5'>
                                <p className='value-style'>{formatNumber(policyHistory?.POLICY_PREM) || ''}</p>
                            </div>
                        </div>

                        <div className='w-full flex items-center'>
                            <div className='w-2/5'>
                                <p className='label-style'>Deposit Premium</p>
                            </div>
                            <div className='w-3/5'>
                                <p className='value-style'>{formatNumber(policyHistory?.DEP_RECVD) || ''}</p>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    );
};

export default PolicyValues;
