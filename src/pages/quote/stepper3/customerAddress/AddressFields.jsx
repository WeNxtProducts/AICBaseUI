import { Checkbox } from 'antd'
import React from 'react'

const AddressFields = () => {
    return (
        <div className='addresses'>
            <div className='mail_field life_assured_check'>
                <Checkbox className='life_check'>
                    Life Assured is premium payor
                </Checkbox>
            </div>

            <div className='address_field'>
                <p>hello</p>
            </div>
            <div className='address_field'>
                <p>hello</p>
            </div>
            <div className='address_field'>
                <p>hello</p>
            </div>
            <div className='address_field'>
                <p>hello</p>
            </div>
        </div>
    )
}

export default AddressFields