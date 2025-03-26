import React, { useEffect } from 'react'
import QuoteJSON from '../../../../getFormFields/GETQUOTE_getFieldList.json'
import QuoteLOVJSON from '../../../../getFormFields/EMAILTEMPLATE_getLOVList.json'
import { useSelector, useDispatch } from 'react-redux';
import {
    setCustAssuredDetails, setDropDown,
    setStepper3
} from '../../../../globalStore/slices/QuoteSlice';
import QuoteForm from '../../quoteForm/QuoteForm';

const CustomerDetailsForm = () => {
    const dispatch = useDispatch();
    const custAssuredDetails = useSelector(state => state?.quote?.custAssuredDetails);
    const dropDown = useSelector(state => state?.quote?.dropDown);

    const onSubmit = async values => {
        console.log("Payload : ", values)
        dispatch(setStepper3('customerAddress'))
    };

    const handleChangeValue = (value, path, setFieldValue) => {
        setFieldValue(path, value);
    };

    return (
        <div className='mt-2 basic_information'>
            {custAssuredDetails !== null && (
                <div className='basic_info_form'>
                    <QuoteForm
                        initialValues={custAssuredDetails}
                        formRender={custAssuredDetails}
                        root='QuotAssuredDtls'
                        lovList={dropDown}
                        addOrUpdate={false}
                        onSubmit={onSubmit}
                        handleChangeValue={handleChangeValue}
                        navigateBtn={false}
                        btnText={{ btn1: 'Save' }}
                    />
                </div>
            )}
        </div>
    )
}

export default CustomerDetailsForm