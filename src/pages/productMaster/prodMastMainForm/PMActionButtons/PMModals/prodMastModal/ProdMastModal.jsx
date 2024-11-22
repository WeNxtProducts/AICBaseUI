import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import MRVProdMast from '../../../../MRVProdMast/MRVProdMast';

const modalStyles = {
    topPosition: { top: 60 },
};

const MessageTitle = ({ title }) => <p className='modal_msg_delete select-none'>{title}</p>;

const ProdMastModal = ({ open, handleClose, modalTitle }) => {
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
            maskClosable={false}
            footer={null}>
            <MRVProdMast
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

export default ProdMastModal
