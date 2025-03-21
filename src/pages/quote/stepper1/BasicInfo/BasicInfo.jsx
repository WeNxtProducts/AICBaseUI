import React, { useEffect } from 'react'
import QuoteJSON from '../../../../getFormFields/QUOTE_getFieldList.json'
import QuoteLOVJSON from '../../../../getFormFields/EMAILTEMPLATE_getLOVList.json'
import { useSelector, useDispatch } from 'react-redux';
import { setBasicInfoForm, setDropDown, setStepperIndex } from '../../../../globalStore/slices/QuoteSlice';
import QuoteForm from '../../quoteForm/QuoteForm';

const BasicInfo = () => {
    const dispatch = useDispatch();
    const basicInfoForm = useSelector(state => state?.quote?.basicInfoForm);
    const dropDown = useSelector(state => state?.quote?.dropDown);

    useEffect(() => {
        if (basicInfoForm === null) {
            dispatch(setBasicInfoForm(QuoteJSON))
            dispatch(setDropDown(QuoteLOVJSON))
        }
    }, [])

    const onSubmit = async values => {
        console.log("Payload : ", values)
        dispatch(setStepperIndex(1));
    };

    const handleChangeValue = (value, path, setFieldValue) => {
        setFieldValue(path, value);
    };

    return (
        <div className='mt-2 basic_information'>
            <p>Basic Information</p>
            {basicInfoForm !== null && (
                <div className='basic_info_form'>
                    <QuoteForm
                        initialValues={basicInfoForm}
                        formRender={basicInfoForm}
                        root='frontForm'
                        lovList={dropDown}
                        addOrUpdate={false}
                        onSubmit={onSubmit}
                        handleChangeValue={handleChangeValue}
                        navigateBtn={false}
                        btnText={{ btn1: 'Get Quote' }}
                    />
                </div>
            )}
        </div>
    )
}

export default BasicInfo