import React, { useState } from 'react'
import CustomerPolicyTable from '../CusPolTable/CustomerPolicyTable'
import InstallmentModal from '../../../components/installmentModal/InstallmentModal'
import PolSummaryModal from './PolSummaryModal'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import '../CustomerPolicy.scss'
import { setPolNo } from '../../../globalStore/slices/CustPolSlice'

const CusPolList = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [installmentOpen, setInstallmentOpen] = useState(false)
    const [polSummaryOpen, setPolicySummaryOpen] = useState(false)
    const [policyDetails, setPolicyDetails] = useState(null)

    const handleClose = () => {
        setInstallmentOpen(false)
        setPolicySummaryOpen(false)
    };

    const handleInstallment = (item) => {
        setPolicyDetails(item)
        setInstallmentOpen(true)
    }

    const handlePolicySummary = (item) => {
        setPolicyDetails(item)
        setPolicySummaryOpen(true)
    }

    const handleSelectedPolicy = (route, item) => {
        dispatch(setPolNo(item))
        navigate(route)
    }

    return (
        <div className='cust_pol_list'>
            <p className='header-font'>Policy List</p>
            <CustomerPolicyTable
                handleInstallment={handleInstallment}
                handlePolicySummary={handlePolicySummary}
                handleSelectedPolicy={handleSelectedPolicy}
            />

            {installmentOpen && (
                <InstallmentModal
                    open={installmentOpen}
                    handleClose={handleClose}
                    tranId={1128}
                    POL_NO={'PO/TM1//000114'}
                />
            )}

            {polSummaryOpen && (
                <PolSummaryModal
                    open={polSummaryOpen}
                    handleClose={handleClose}
                    policyDetails={policyDetails}
                />
            )}

        </div>
    )
}

export default CusPolList