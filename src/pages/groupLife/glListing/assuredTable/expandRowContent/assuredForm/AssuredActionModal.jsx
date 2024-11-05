import React, { useState } from 'react'
import BeneficiarySVG from '../../../../../../svg/BeneficiarySVG'
import LoadingSVG from '../../../../../../svg/LoadingSVG'
import ChecklistSVG from '../../../../../../svg/ChecklistSVG'
import MedicalSVG from '../../../../../../svg/MedicalSVG'
import CoverSVG from '../../../../../../svg/CoverSVG'
import MoreSVG from '../../../../../../svg/MoreSVG'
import AssuredModal from '../../assuredModal/AssuredModal'

const AssuredActionModal = ({ record }) => {
    const [openModal, setOpenModal] = useState(false)
    const [openCheckList, setOpenCheckList] = useState(false)

    const handleClose = () => {
        setOpenModal(false)
    }

    return (
        <div className='action_buttons'>
            <div className='pop_up_btns'>
                <div onClick={() => setOpenModal(true)} className="action_item">
                    <BeneficiarySVG className='custom-svg' />
                    <p className='action_names'>Beneficiary</p>
                </div>
                <div onClick={() => setOpenModal(true)} className="action_item">
                    <LoadingSVG className='custom-svg' />
                    <p className='action_names'>Loading</p>
                </div>
                <div onClick={() => setOpenCheckList(true)} className="action_item">
                    <ChecklistSVG className='custom-svg' />
                    <p className='action_names'>Checklist</p>
                </div>
                <div onClick={() => setOpenModal(true)} className="action_item">
                    <MedicalSVG className='custom-svg' />
                    <p className='action_names'>Medical</p>
                </div>
                <div onClick={() => setOpenModal(true)} className="action_item">
                    <CoverSVG className='custom-svg' />
                    <p className='action_names'>Cover</p>
                </div>
            </div>
            <div className='more_btn'>
                <MoreSVG className='more-svg' />
            </div>
            {openModal &&
                <AssuredModal
                    open={openModal}
                    handleClose={handleClose}
                    modalTitle='Beneficiary'
                    record={record}
                />
            }
        </div>
    )
}

export default AssuredActionModal
