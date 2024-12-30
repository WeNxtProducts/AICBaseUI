import React, { useEffect } from 'react';
import { Button } from 'antd';
import { alterData } from '../../../../../../components/tableComponents/sampleData';
import ClaimCards from './claimCards/ClaimCards';
import { formatNumber } from '../../../../../../components/commonHelper/CurrentFormatter';

const ClaimDetails = ({ currentTab, dataLoaded }) => {
    const rowData = alterData;

    useEffect(() => {
        if (dataLoaded) console.log('ClaimDetails ');
    }, [dataLoaded]);

    const handleNavigateToAlterations = () => {
        console.log("handleNavigateToAlterations")
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
        <div className='alteration alter_claim'>
            <div className='mb-5'>
                <Button
                    onClick={() => handleNavigateToAlterations()}
                    className='add-buttons-edorsement'
                    type='primary'
                    icon={<i className='bi bi-plus icon-style' />}>
                    Add Claim
                </Button>
            </div>
            <ClaimCards rowData={rowData} />
            <p className='summary_title mt-5'>Summary</p>
            <div className='claim_small_summary mt-2 grid grid-cols-2 items-center gap-y-3'>
                <div className='col-span-1'>{renderFields('Total Outstanding premium', 100000)}</div>
                <div className='col-span-1'>{renderFields('Loan Interest Due', 10000)}</div>
                <div className='col-span-1'>{renderFields('Due Premium Interest', 10000)}</div>
                <div className='col-span-1'>{renderFields('Excess Deposit', 10000)}</div>
                <div className='col-span-1'>{renderFields('Total Loan Outstanding', 10000)}</div>
            </div>
        </div>
    );
};

export default ClaimDetails;
