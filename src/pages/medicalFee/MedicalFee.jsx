import React from 'react'
import MedicalFeeExamDetailForm from './medicalFeeExamDetailForm/MedicalFeeExamDetailForm';
import MedPolicyDetails from './medPolicyDetails/MedPolicyDetails';
import './MedicalFee.scss';

const MedicalFee = () => {
    return (
        <div className='medical_fee'>
            <MedicalFeeExamDetailForm />
            <MedPolicyDetails />
        </div>
    )
}

export default MedicalFee
