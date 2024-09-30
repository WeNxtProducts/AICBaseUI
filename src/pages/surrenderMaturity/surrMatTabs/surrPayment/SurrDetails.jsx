import React from 'react'
import { CustomDatePicker, CustomNumberField } from '../../../../components/commonExportsFields/CommonExportsFields';
import dayjs from 'dayjs';

const SurrDetails = () => {
    return (
        <div className='mt-4'>
            <div className='mt-2 grid grid-cols-2 items-center gap-y-3 gap-x-5'>
                <div className='col-span-1'>
                    <div className='col-span-1 grid grid-cols-5 items-center'>
                        <p className='col-span-2 form-label'>Date</p>
                        <div className='col-span-3'>
                            <CustomDatePicker
                                name='date'
                                placeholder='date'
                                size='large'
                                value={dayjs()}
                                disabled={true}
                                onChange={date => {
                                    console.log("date : ", date)
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-span-1'>
                    <div className='col-span-1 grid grid-cols-5 items-center'>
                        <p className='col-span-2 form-label'>Paid date</p>
                        <div className='col-span-3'>
                            <CustomDatePicker
                                name='paid_date'
                                placeholder='date'
                                size='large'
                                value={dayjs()}
                                disabled={true}
                                onChange={date => {
                                    console.log("date : ", date)
                                }}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-span-1'>
                    <div className='col-span-1 grid grid-cols-5 items-center'>
                        <p className='col-span-2 form-label'>Gross Payable Amount</p>
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
                <div className='col-span-1'>
                    <div className='col-span-1 grid grid-cols-5 items-center'>
                        <p className='col-span-2 form-label'>Gross Payable Amount</p>
                        <div className='col-span-3'>
                            <CustomNumberField
                                name={`interest_value`}
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
            </div>
        </div>
    )
}

export default SurrDetails
