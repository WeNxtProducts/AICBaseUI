import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import { alterData } from '../../../../../../components/tableComponents/sampleData';
import { formatNumber } from '../../../../../../components/commonHelper/CurrentFormatter';
import LoanCards from './LoanCards';
import LoanDisbursal from './loanDisbursal/LoanDisbursal';

const LoanDetails = ({ currentTab, dataLoaded }) => {
    const rowData = alterData;
    const [showDisbursal, setShowDisbursal] = useState(true)

    useEffect(() => {
        if (dataLoaded) console.log('Loan Details ');
    }, [dataLoaded]);

    const handleNavigateToAlterations = () => {
        setShowDisbursal(true)
    };

    const renderFields = (label, val) => (
        <div className='col-span-1 grid grid-cols-5 items-center'>
            <p className='col-span-2 form-label'>{label}</p>
            <div className='col-span-2 form-value'>
                <p className='float-right pe-3'>{formatNumber(val)}</p>
            </div>
        </div>
    );

    return (
        <div className='alteration alter_loan'>
            {!showDisbursal ?
                (
                    <>
                        <div className='mb-5'>
                            <Button
                                onClick={() => handleNavigateToAlterations()}
                                className='add-buttons-edorsement'
                                type='primary'
                                icon={<i className='bi bi-plus icon-style' />}>
                                Add Loan
                            </Button>
                        </div>
                        <LoanCards rowData={rowData} />
                        <p className='summary_title mt-5'>Summary</p>
                        <div className='claim_small_summary mt-2 grid grid-cols-2 items-center gap-y-3'>
                            <div className='col-span-1'>{renderFields('Total Outstanding premium', 100000)}</div>
                            <div className='col-span-1'>{renderFields('Due Premium Interest', 10000)}</div>
                            <div className='col-span-1'>{renderFields('Excess Deposit', 10000)}</div>
                        </div>
                    </>
                )
                :
                (
                    <LoanDisbursal setShowDisbursal={setShowDisbursal} />
                )
            }

        </div>
    );
};

export default LoanDetails;
