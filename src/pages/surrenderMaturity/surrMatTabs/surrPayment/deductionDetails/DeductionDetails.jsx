import React from 'react'
import { CustomDatePicker, CustomNumberField } from '../../../../../components/commonExportsFields/CommonExportsFields'
import dayjs from 'dayjs'

const DeductionDetails = ({ surrMatValues }) => {
    const { SMV_FC_CHARGE_AMT, SMV_LC_CHARGE_AMT, SMV_FC_OS_LOAN, SMV_LC_OS_LOAN,
        SMV_FC_BAL_LOAN, SMV_LC_BAL_LOAN, SMV_FC_UNPAID_PREM, SMV_LC_UNPAID_PREM,
        SMV_FC_NET_PAID_AMT, SMV_LC_NET_PAID_AMT
    } = surrMatValues

    const renderDeductionField = (label, val = .00) => (
        <div className='col-span-1'>
            <div className='col-span-1 grid grid-cols-5 items-center'>
                <p className='col-span-2 form-label'>{label}</p>
                <div className='col-span-3'>
                    <CustomNumberField
                        name={`gross_pay_amt`}
                        placeholder='.00'
                        size='medium'
                        value={val}
                        readOnly={true}
                        format='amount'
                        onChange={e => {
                            console.log(e);
                        }}
                    />
                </div>
            </div>
        </div>
    )
    return (
        <div className='deduction_details'>
            <fieldset>
                <legend>Deduction Details</legend>
                <div className='mt-2 grid grid-cols-2 items-center gap-y-2 gap-x-5'>
                    {renderDeductionField('Processing Fee FC Amount', SMV_FC_CHARGE_AMT)}
                    {renderDeductionField('Processing Fee LC Amount', SMV_LC_CHARGE_AMT)}
                    {renderDeductionField('FC Amount O/S Loan', SMV_FC_OS_LOAN)}
                    {renderDeductionField('LC Amount O/S Loan', SMV_LC_OS_LOAN)}
                    {renderDeductionField('FC Amount Loan to be paid', SMV_FC_BAL_LOAN)}
                    {renderDeductionField('LC Amount Loan to be paid', SMV_LC_BAL_LOAN)}
                    {renderDeductionField('FC Amount Unpaid Premium', SMV_FC_UNPAID_PREM)}
                    {renderDeductionField('LC Amount Unpaid Premium', SMV_LC_UNPAID_PREM)}
                    {renderDeductionField('Total FC Paid Amount', SMV_FC_NET_PAID_AMT)}
                    {renderDeductionField('Total LC Paid Amount', SMV_LC_NET_PAID_AMT)}
                </div>
            </fieldset>
        </div>
    )
}

export default DeductionDetails
