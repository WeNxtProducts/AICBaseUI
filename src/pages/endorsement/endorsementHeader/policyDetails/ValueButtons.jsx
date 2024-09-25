import React, { useContext, useState } from 'react';
import { Button } from 'antd';
import { EndorsementContext } from '../../Endorsement';
import CheckListDocuments from '../../../underWriterWorkBench/coverage/checkListDocuments/CheckListDocuments';

const ValueButtons = () => {
    const { POL_NO, tranId } = useContext(EndorsementContext);

    const [checkListOpen, setCheckListOpen] = useState(false);

    const handleClose = () => {
        setCheckListOpen(false);
    };

    return (
        <div className='action-buttons'>
            <div className='flex flex-col items-center'>
                <Button onClick={() => setCheckListOpen(true)}>View Checklist</Button>
                <Button>View Dcuments</Button>
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
        </div>
    );
};

export default ValueButtons;
