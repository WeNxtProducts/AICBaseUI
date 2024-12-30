import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'antd';

const ConfirmSurrenderModal = ({ open, handleClose }) => {
    const [Open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(open);
    }, [open]);

    const onClose = (decision) => {
        setOpen(false);
        handleClose(decision);
    };

    return (
        <Modal
            open={Open}
            width={400}
            onCancel={() => onClose(false)}
            maskClosable={false}
            className='confirm_surrender'
            footer={null}
        >
            <div className='modal-content'>
                <p>Do you want to surrender your policy?</p>
                <div className='button-group'>
                    <Button className='no-button' onClick={() => onClose(false)}>
                        No
                    </Button>
                    <Button className='yes-button' type="primary" onClick={() => onClose(true)}>
                        Yes
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ConfirmSurrenderModal;
