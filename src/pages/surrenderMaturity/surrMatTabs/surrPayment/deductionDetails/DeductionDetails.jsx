import React from 'react'
import { CustomDatePicker, CustomNumberField } from '../../../../../components/commonExportsFields/CommonExportsFields'
import dayjs from 'dayjs'

const DeductionDetails = ({ surrMatValues }) => {
    const { SMV_FC_CHARGE_AMT, SMV_LC_CHARGE_AMT, SMV_FC_OS_LOAN, SMV_LC_OS_LOAN,
        SMV_FC_BAL_LOAN, SMV_LC_BAL_LOAN, SMV_FC_UNPAID_PREM, SMV_LC_UNPAID_PREM,
        SMV_FC_NET_PAID_AMT, SMV_LC_NET_PAID_AMT, SMV_FC_UNPAID_PREM_INT, SMV_LC_UNPAID_PREM_INT
    } = surrMatValues

    const renderDeductionField = (label, val = .00, isFC) => (
        <div className='col-span-1'>
            <div className='col-span-1 grid grid-cols-5 items-center'>
                {isFC === 'FC' && <p className='col-span-2 form-label'>{label}</p>}
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
                    <div className='col-span-2'>
                        <div className='col-span-1 grid grid-cols-5 items-center'>
                            <div className='col-span-2 grid grid-cols-2'>
                                <p className='col-span-1' />
                                <p className='col-span-1 form-label m-auto'>FC Amount</p>
                            </div>
                            <p className='col-span-2 form-label m-auto'>LC Amount</p>
                        </div>
                    </div>
                    {renderDeductionField('Processing Fee', SMV_FC_CHARGE_AMT, 'FC')}
                    {renderDeductionField('Processing Fee', SMV_LC_CHARGE_AMT, 'LC')}
                    {renderDeductionField('Outstanding Loan', SMV_FC_OS_LOAN, 'FC')}
                    {renderDeductionField('outstanding loan', SMV_LC_OS_LOAN, 'LC')}
                    {renderDeductionField('Outstanding Loan Interest', SMV_FC_BAL_LOAN, 'FC')}
                    {renderDeductionField('outstanding loan interest', SMV_LC_BAL_LOAN, 'LC')}
                    {renderDeductionField('Outstanding Premium', SMV_FC_UNPAID_PREM, 'FC')}
                    {renderDeductionField('outstanding premium', SMV_LC_UNPAID_PREM, 'LC')}
                    {renderDeductionField('Premium Interest', SMV_FC_UNPAID_PREM_INT, 'FC')}
                    {renderDeductionField('Premium Interest', SMV_LC_UNPAID_PREM_INT, 'LC')}
                    {renderDeductionField('Net Payable Amount', SMV_FC_NET_PAID_AMT, 'FC')}
                    {renderDeductionField('net payable amount', SMV_LC_NET_PAID_AMT, 'LC')}
                </div>
            </fieldset>
        </div>
    )
}

export default DeductionDetails
