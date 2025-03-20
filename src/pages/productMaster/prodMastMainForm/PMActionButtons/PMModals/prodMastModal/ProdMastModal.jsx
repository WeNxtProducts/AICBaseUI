import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'antd';
import MRVProdMast from '../../../../MRVProdMast/MRVProdMast';
import { ProductMasterContext } from '../../../../ProductMaster';

const modalStyles = {
    topPosition: { top: 60 },
};

const MessageTitle = ({ title }) => <p className='modal_msg_delete select-none'>{title}</p>;

const ProdMastModal = ({ open, handleClose, modalTitle, root,
    queryID, mrvGet, screenCode, screenName, saveRow, editRow, deleteRow
}) => {
    const { id: tranId } = useContext(ProductMasterContext);
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
                queryID={queryID}
                root={root}
                mrvGet={mrvGet}
                screenCode={screenCode}
                screenName={screenName}
                saveRow={saveRow}
                editRow={editRow}
                deleteRow={deleteRow}
                title=''
                tranId={tranId}
            />
        </Modal>
    )
}

export default ProdMastModal
