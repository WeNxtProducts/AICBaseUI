import React, { useContext } from 'react'
import { AlterationContext } from '../../AlterationPages';
import { bankColumn, bankData } from '../../../../../../../../../components/tableComponents/sampleData';
import EndorementListing from './EndorementListing';

const AddtionDeletionRider = () => {
    const { alterationType, setSelectedAlteration, selectedAlteration } =
        useContext(AlterationContext);
    const { key } = selectedAlteration;

    const handlePrev = () => {
        setSelectedAlteration(null);
    };

    return (
        <div className='alter_change_page alter_change_page_rider'>
            <button onClick={() => handlePrev()}>Back</button>
            <div className='flex items-center'>
                <p className='change_style'>Endorsement Details</p>
                <div className='prem_calc_msg'>
                    <span className='circle-tick' /> <p>Premium Calculated !!!</p>
                </div>
            </div>

            <div className='propasal-entry-form col-span-8 grid grid-cols-9 mt-3'>
                <div className={`col-span-${'7'} mt-1`}>
                    <p>form</p>
                </div>

                <div className='col-span-2 pl-1 border_left_divider'>
                    <EndorementListing
                        tableColumn={bankColumn}
                        tableData={bankData}
                    />
                </div>

            </div>
        </div>
    )
}

export default AddtionDeletionRider
