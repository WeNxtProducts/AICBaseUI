import React from 'react';
import AnnuityMainForm from './annuityMainForm/AnnuityMainForm';
import AnnuityType from './annuityType/AnnuityType';
import './AnnuityMaster.scss';

const AnnuityMaster = () => {
    return (
        <div className='annuity_master'>
            <AnnuityMainForm />
            <AnnuityType />
        </div>
    )
}

export default AnnuityMaster
