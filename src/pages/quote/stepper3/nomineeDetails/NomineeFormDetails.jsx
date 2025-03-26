import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {
    setStepper3
} from '../../../../globalStore/slices/QuoteSlice';
import QuoteForm from '../../quoteForm/QuoteForm';

const NomineeFormDetails = () => {
    const dispatch = useDispatch();
    const custAssuredDetails = useSelector(state => state?.quote?.custAssuredDetails);
    const dropDown = useSelector(state => state?.quote?.dropDown);

    const onSubmit = async values => {
        console.log("Payload : ", values)
        dispatch(setStepper3(''))
    };

    const handleChangeValue = (value, path, setFieldValue) => {
        setFieldValue(path, value);
    };

    const handlePrevious = () => {
        dispatch(setStepper3('customerAddress'))
    }

    return (
        <div className='mt-2 basic_information'>
            {custAssuredDetails !== null && (
                <div className='basic_info_form'>
                    <QuoteForm
                        initialValues={custAssuredDetails}
                        formRender={custAssuredDetails}
                        root='NomineeDetails'
                        lovList={dropDown}
                        addOrUpdate={false}
                        onSubmit={onSubmit}
                        handleChangeValue={handleChangeValue}
                        navigateBtn={true}
                        btnText={{ btn1: 'Save', btn2: 'Previous' }}
                        handlePrevious={handlePrevious}
                    />
                </div>
            )}
        </div>
    )
}

export default NomineeFormDetails