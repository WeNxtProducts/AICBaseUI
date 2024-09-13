import React, { useEffect, useState } from 'react'
import { Modal } from 'antd';
import PremiumCard from './PremiumCard';

const PremiumModal = ({ open, handleClose }) => {
    const [Open, setOpen] = useState(false);

    useEffect(() => {
        setOpen(open);
    }, []);

    const onClose = status => {
        setOpen(false);
        handleClose(status);
    };

    return (
        <Modal open={Open}
            width={600}
            onCancel={() => onClose(false)}
            footer={null}>
            <PremiumCard />
        </Modal>
    )
}

export default PremiumModal
