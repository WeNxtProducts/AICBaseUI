import React, { useState } from 'react';
import { Button } from 'antd';
import WithDrawalSetUp from './PMModals/WithDrawalSetUp';
import ProdMastModal from './PMModals/prodMastModal/ProdMastModal';

const PMActionButtons = () => {
    const [openWithdrawalSetup, setOpenWithdrawalSetup] = useState(false)
    const [productFactor, setProductFactor] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [modalTitle, setModalTitle] = useState('')

    const handleClose = () => {
        setOpenWithdrawalSetup(false)
        setOpenModal(false)
        setProductFactor(false)
    }

    const handleOpenModal = (title) => {
        setModalTitle(title)
        if (title === 'Prodct Factors') {
            setProductFactor(true)
        }
        // setOpenModal(true)
    }

    return (
        <div className='action-buttons'>
            <div className='section-1 flex flex-col items-center'>
                <Button onClick={() => setOpenWithdrawalSetup(true)}>
                    Withdrawal SetUp
                </Button>
                <Button onClick={() => handleOpenModal('Prodct Factors')}>Product Factors</Button>
                <Button onClick={() => handleOpenModal('Applicable Charges')}>Applicable Charges</Button>
                <Button onClick={() => handleOpenModal('Interest Master')}>Interest Master</Button>
                <Button onClick={() => handleOpenModal('Product Tax Setup')}>Product Tax Setup</Button>
            </div>

            {openWithdrawalSetup &&
                <WithDrawalSetUp open={openWithdrawalSetup}
                    handleClose={handleClose}
                />
            }

            {productFactor &&
                <ProdMastModal
                    open={productFactor}
                    handleClose={handleClose}
                    modalTitle={modalTitle}
                    root='prodFactor'
                    queryID='prodFactor'
                    mrvGet='getProFacDetails'
                    screenCode='PRODUCTMASTER'
                    screenName='PRODUCTMASTER'
                    saveRow='saveProFacDetails'
                    editRow='updateProFacDetails'
                    deleteRow='deleteProFacDetails'
                />
            }

            {openModal &&
                <ProdMastModal
                    open={openModal}
                    handleClose={handleClose}
                    modalTitle={modalTitle}
                />
            }
        </div>
    );
};

export default PMActionButtons;
