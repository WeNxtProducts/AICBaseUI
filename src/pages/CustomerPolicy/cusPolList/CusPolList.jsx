import React, { useState } from 'react'
import CustomerPolicyTable from '../CusPolTable/CustomerPolicyTable'
import InstallmentModal from '../../../components/installmentModal/InstallmentModal'
import '../CustomerPolicy.scss'

const CusPolList = () => {
    const [installmentOpen, setInstallmentOpen] = useState(false)

    const handleClose = () => {
        setInstallmentOpen(false)
    };

    const handleInstallment = (item) => {
        setInstallmentOpen(true)
    }

    return (
        <div className='cust_pol_list'>
            <p className='header-font'>Policy List</p>
            <CustomerPolicyTable
                handleInstallment={handleInstallment}
            />

            {installmentOpen && (
                <InstallmentModal
                    open={installmentOpen}
                    handleClose={handleClose}
                    tranId={1128}
                    POL_NO={'PO/TM1//000114'}
                />
            )}

        </div>
    )
}

export default CusPolList