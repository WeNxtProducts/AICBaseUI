import React, { useEffect } from 'react';
import CustomAccordion from '../../../components/customAccordion/CustomAccordion';
import { Checkbox } from 'antd';
import CustomerDetails from './customerDetails/CustomerDetails';
import CustomerAddress from './customerAddress/CustomerAddress';
import NomineeDetails from './nomineeDetails/NomineeDetails';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCustDetailId, setLoader, setStepper3, setStepperIndex } from '../../../globalStore/slices/QuoteSlice';
import CustomerDetailsForm from './customerDetails/CustomerDetailsForm';
import NomineeFormDetails from './nomineeDetails/NomineeFormDetails';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';

const Stepper3 = () => {
    const dispatch = useDispatch();
    const activeSection = useSelector(state => state?.quote?.stepper_3);
    const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
    const tranId = useSelector(state => state?.quote?.tranId);
    const custDetailId = useSelector(state => state?.quote?.custDetailId);

    const toggleAccordion = (section) => {
        dispatch(setStepper3(section))
    };

    const handleFetchId = async () => {
        dispatch(setLoader(true));
        try {
            const payload = { queryParams: { tranId } }
            const response = await getMapQuery(payload, { queryId: 260 });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                dispatch(setCustDetailId(response?.Data[0]?.ID))
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            dispatch(setLoader(false));
        }
    };

    useEffect(() => {
        if (custDetailId === null) {
            handleFetchId()
        }
        setTimeout(() => {
            dispatch(setStepper3('customerDetails'))
        }, 200)
    }, [])

    return (
        <div className='stepper_3'>
            <p className='head_assured_cust'>Assured/Customer Details</p>
            <div>
                <div className='life_assured_check'>
                    <Checkbox className='life_check'>
                        Life Assured is premium payor
                    </Checkbox>
                </div>
                <CustomAccordion
                    title='Customer Details'
                    isOpen={activeSection === 'customerDetails'}
                    toggleAccordion={() => toggleAccordion('customerDetails')}
                >
                    {/* <CustomerDetails /> */}
                    <CustomerDetailsForm />
                </CustomAccordion>
                <CustomAccordion
                    title='Customer Address'
                    isOpen={activeSection === 'customerAddress'}
                    toggleAccordion={() => toggleAccordion('customerAddress')}
                >
                    <CustomerAddress />
                </CustomAccordion>
                <CustomAccordion
                    title='Nominee Details'
                    isOpen={activeSection === 'nomineeDetails'}
                    toggleAccordion={() => toggleAccordion('nomineeDetails')}
                >
                    {/* <NomineeDetails /> */}
                    <NomineeFormDetails />
                </CustomAccordion>
            </div>
            {!activeSection &&
                <div className='save_btn_grid_final mt-3'>
                    <button
                        onClick={() => dispatch(setStepperIndex(3))}
                        type='submit'>
                        Save
                    </button>
                    <button
                        onClick={() => dispatch(setStepperIndex(1))}>
                        Previous
                    </button>
                </div>
            }
        </div >
    );
};

export default Stepper3;
