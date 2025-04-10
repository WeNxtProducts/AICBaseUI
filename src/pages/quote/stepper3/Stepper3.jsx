import React, { useEffect } from 'react';
import CustomAccordion from '../../../components/customAccordion/CustomAccordion';
import { Checkbox } from 'antd';
import CustomerDetails from './customerDetails/CustomerDetails';
import CustomerAddress from './customerAddress/CustomerAddress';
import NomineeDetails from './nomineeDetails/NomineeDetails';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCustDetailId, setLoader, setQuoteStepStatus, setStepper3, setStepperIndex } from '../../../globalStore/slices/QuoteSlice';
import CustomerDetailsForm from './customerDetails/CustomerDetailsForm';
import NomineeFormDetails from './nomineeDetails/NomineeFormDetails';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

const Stepper3 = () => {
    const dispatch = useDispatch();
    const activeSection = useSelector(state => state?.quote?.stepper_3);
    const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
    const tranId = useSelector(state => state?.quote?.tranId);
    const custDetailId = useSelector(state => state?.quote?.custDetailId);
    const quoteSteps = useSelector(state => state?.quote?.quoteSteps);
    const isStepComplete = quoteSteps.find(step => step.id === 3)?.status;

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

        return () => {
            dispatch(setStepper3(''))
        }
    }, [])

    return (
        <div className='stepper_3'>
            <div className="relative grid items-center">
                <div
                    onClick={() => dispatch(setStepperIndex(1))}
                    className="absolute left-0 flex items-center space-x-2 group cursor-pointer">
                    <ArrowLeftOutlined className="h-3 w-3 text-blue-600 group-hover:text-blue-800" />
                    <span className="text-blue-600 group-hover:text-blue-800 group-hover:underline">Back</span>
                </div>
                <p className="head_assured_cust">Assured/Customer Details</p>
                {isStepComplete &&
                    <div
                        onClick={() => dispatch(setStepperIndex(3))}
                        className="absolute right-0 flex items-center space-x-2 group cursor-pointer">
                        <span className="text-blue-600 group-hover:text-blue-800 group-hover:underline">Next</span>
                        <ArrowRightOutlined className="h-3 w-3 text-blue-600 group-hover:text-blue-800" />
                    </div>
                }
            </div>
            <div className='mt-2'>
                {/* <div className='life_assured_check'>
                    <Checkbox className='life_check'>
                        Life Assured is premium payor
                    </Checkbox>
                </div> */}
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
                        onClick={() => {
                            dispatch(setQuoteStepStatus(3))
                            dispatch(setStepperIndex(3))
                        }}
                        type='submit'>
                        Next
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
