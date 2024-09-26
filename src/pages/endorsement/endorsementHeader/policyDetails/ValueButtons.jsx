import React, { useContext, useState } from 'react';
import { Button } from 'antd';
import { EndorsementContext } from '../../Endorsement';
import CheckListDocuments from '../../../underWriterWorkBench/coverage/checkListDocuments/CheckListDocuments';
import InstallmentModal from './installmentModal/InstallmentModal';

const ValueButtons = () => {
    const { POL_NO, tranId } = useContext(EndorsementContext);
    const [checkListOpen, setCheckListOpen] = useState(false);
    const [installmentOpen, setInstallmentOpen] = useState(false)

    const handleClose = () => {
        setCheckListOpen(false);
        setInstallmentOpen(false)
    };

    return (
        <div className='action-buttons'>
            <div className='flex flex-col items-center'>
                <Button onClick={() => setCheckListOpen(true)}>View Checklist</Button>
                <Button onClick={() => setInstallmentOpen(true)}>View Installments</Button>
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
