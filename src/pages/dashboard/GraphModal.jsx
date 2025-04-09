import { useEffect, useState } from 'react';
import { Modal } from 'antd';

const GraphModal = ({ graphOpen, handleClose, selectedGraph, children }) => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(graphOpen);
    }, [graphOpen]);

    const handleCloseModal = () => {
        setOpen(false);
        handleClose();
    };

    return (
        <Modal
            centered
            open={open}
            onCancel={() => handleCloseModal()}
            maskClosable={false}
            footer={null}
            className='charts-line'
            width={1000}>
            <div className=''>
                {children}
            </div>
        </Modal>
    );
};

export default GraphModal;
