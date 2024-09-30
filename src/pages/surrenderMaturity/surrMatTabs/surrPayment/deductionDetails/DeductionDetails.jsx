import React from 'react'
import { CustomDatePicker, CustomNumberField } from '../../../../../components/commonExportsFields/CommonExportsFields'
import dayjs from 'dayjs'

const DeductionDetails = () => {

    const renderDeductionField = (label, val) => (
        <div className='col-span-1'>
            <div className='col-span-1 grid grid-cols-5 items-center'>
                <p className='col-span-2 form-label'>{label}</p>
                <div className='col-span-3'>
                    <CustomNumberField
                        name={`gross_pay_amt`}
                        placeholder='.00'
                        size='large'
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
                    {renderDeductionField('Processing Fee FC Amount', '.00')}
                    {renderDeductionField('Processing Fee LC Amount', '.00')}
                    {renderDeductionField('FC Amount O/S Loan', '.00')}
                    {renderDeductionField('LC Amount O/S Loan', '.00')}
                    {renderDeductionField('FC Amount Loan to be paid', '.00')}
                    {renderDeductionField('LC Amount Loan to be paid', '.00')}
                    {renderDeductionField('FC Amount Unpaid Premium', '.00')}
                    {renderDeductionField('LC Amount Unpaid Premium', '.00')}
                    {renderDeductionField('Total FC Paid Amount', '.00')}
                    {renderDeductionField('Total LC Paid Amount', '.00')}
                </div>
            </fieldset>
        </div>
    )
}

export default DeductionDetails
