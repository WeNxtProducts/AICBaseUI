import React, { useState } from 'react'
import FormCreate from './formCreate/FormCreate'
import ClaimsLOVJson from '../../../../../../../getFormFields/CLAIMENTRY_getLOVList_1.json'
import loanDisbursalJSON from '../../../../../../../getFormFields/LOAN_DISBURSAL.json';

const LoanDisbursal = ({ setShowDisbursal, POL_NO, tranId, handleUpdateList }) => {
    const [dropDown, setDropDown] = useState({
        LOAN_REPAY_FREQ: [
            { label: "Half Yearly", value: "H" },
            { label: "Monthly", value: "M" },
            { label: "Quarterly", value: "Q" },
            { label: "Single", value: "S" },
            { label: "Yearly", value: "Y" }
        ],
    });

    return (
        <div>
            <p className='summary_title'>Loan Disbursal</p>
            <FormCreate
                root='loan'
                mrvGet='getLoanMrv'
                saveRow='saveLoanDetails'
                editRow='updateLoanDetails'
                deleteRow='deleteLoanDetails'
                ClaimsJson={loanDisbursalJSON}
                setDropDown={setDropDown}
                dropDown={dropDown}
                freeze={false}
                setShowDisbursal={setShowDisbursal}
                POL_NO={POL_NO} tranId={tranId}
                handleUpdateList={handleUpdateList}
            />
        </div>
    )
}

export default LoanDisbursal
