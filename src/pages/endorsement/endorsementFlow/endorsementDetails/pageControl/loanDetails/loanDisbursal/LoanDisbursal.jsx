import React, { useState } from 'react'
import FormCreate from './formCreate/FormCreate'
import ClaimsJson from '../../../../../../../getFormFields/CLAIMENTRY_getFieldList_1.json'
import ClaimsLOVJson from '../../../../../../../getFormFields/CLAIMENTRY_getLOVList_1.json'

const LoanDisbursal = ({ setShowDisbursal }) => {
    const [dropDown, setDropDown] = useState(ClaimsLOVJson);

    return (
        <div>
            <p className='summary_title'>Loan Disbursal</p>
            <FormCreate
                root='ClaimCharges'
                mrvGet='getClaimChargesDetailsEdit'
                screenCode='CLAIMENTRY'
                screenName='CLAIMENTRY'
                saveRow='claimChargeCreate'
                editRow='claimChargeUpdate'
                deleteRow='claimChargeDelete'
                ClaimsJson={ClaimsJson}
                setDropDown={setDropDown}
                dropDown={dropDown}
                freeze={false}
                setShowDisbursal={setShowDisbursal}
            />
        </div>
    )
}

export default LoanDisbursal
