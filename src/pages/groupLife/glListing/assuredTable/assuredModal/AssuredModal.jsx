import { Modal } from 'antd';
import React, { useEffect, useState } from 'react'
import MRVAssured from '../../../MRVAssured/MRVAssured';

const modalStyles = {
    topPosition: { top: 60 },
};

const MessageTitle = ({ title }) => <p className='modal_msg_delete select-none'>{title}</p>;

const AssuredModal = ({ open, handleClose, modalTitle, record }) => {
    const [Open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(open)
    }, [])

    const onClose = status => {
        setOpen(false);
        handleClose(status);
    };

    return (
        <Modal
            open={Open}
            width={1150}
            title={<MessageTitle title={modalTitle} />}
            style={modalStyles?.topPosition}
            onCancel={() => onClose(false)}
            maskClosable={true}
            footer={null}>
            <MRVAssured
                queryID='getBeneficiaryList'
                root='benificiary'
                mrvGet='getBeneficiaryDetails'
                screenCode='QUOTATIONENTRY'
                screenName='QUOTATIONENTRY'
                saveRow='saveBeneficiaryDetails'
                editRow='updateBeneficiaryDetails'
                deleteRow='deleteBeneficiaryDetails'
                title=''
                tranId={1090}
                subId={970}
            />
        </Modal>
    )
}

export default AssuredModal
