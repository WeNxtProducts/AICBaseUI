import React, { useContext, useState } from 'react';
import { Button } from 'antd';
import { EndorsementContext } from '../../Endorsement';
import CheckListDocuments from '../../../underWriterWorkBench/coverage/checkListDocuments/CheckListDocuments';
import InstallmentModal from './installmentModal/InstallmentModal';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setReInsurancePolNo, setReInsuranceId } from '../../../../globalStore/slices/ReInsuranceSlices'

const ValueButtons = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { POL_NO, tranId } = useContext(EndorsementContext);
    const [checkListOpen, setCheckListOpen] = useState(false);
    const [installmentOpen, setInstallmentOpen] = useState(false)

    const handleClose = () => {
        setCheckListOpen(false);
        setInstallmentOpen(false)
    };

    const handleNavigateToReInsurace = () => {
        dispatch(setReInsuranceId(tranId));
        dispatch(setReInsurancePolNo(POL_NO));
        navigate('/reInsuranceService')
    }

    return (
        <div className='action-buttons'>
            <div className='flex flex-col items-center'>
                <Button onClick={() => setCheckListOpen(true)}>View Checklist</Button>
                <Button onClick={() => setInstallmentOpen(true)}>View Installments</Button>
                <Button onClick={() => handleNavigateToReInsurace()}>Re-Insurance</Button>
            </div>

            {checkListOpen && (
                <CheckListDocuments
                    open={checkListOpen}
                    handleClose={handleClose}
                    tranId={tranId}
                    proposalNumber={POL_NO}
                    freeze={true}
                />
            )}

            {installmentOpen && (
                <InstallmentModal
                    open={installmentOpen}
                    handleClose={handleClose}
                    tranId={tranId}
                    POL_NO={POL_NO}
                />
            )}
        </div>
    );
};

export default ValueButtons;
