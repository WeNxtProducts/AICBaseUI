import React, { createContext, useCallback, useEffect, useState } from 'react';
import { Button, Checkbox } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProposalEntry from './proposalEntryForm/ProposalEntry';
import QuotationPanels from './quotationPanels/QuotationPanels';
import useStepper from '../../components/customStepper/useStepper';
import CustomStepper from '../../components/customStepper/CustomStepper';
// import { proposalStepper } from '../../components/tableComponents/sampleData';
import Loader from '../../components/loader/Loader';
import QuotationJSON from '../../getFormFields/QUOTATIONENTRY_getFieldList.json';
import QuotationLov from '../../getFormFields/QUOTATIONENTRY_getLOVList.json';
import UnderWriterWorkBench from '../underWriterWorkBench/UnderWriterWorkBench';
import {
    setCurrentID,
    setFormValues,
    setFreezeStatus,
    setProdCode,
    setStepperId,
} from '../../globalStore/slices/IdSlices';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../../components/notification/Notification';
import StatusPopup from '../../components/statusPopup/StatusPopup';
import { setCustCode, setPolNum } from '../../globalStore/slices/UnderwriterId';
import useDynamicPath from '../../components/mrvListing/useDynamicPath';
import './Quotations.scss';

export const StepperContext = createContext();

const Quotation = () => {
    const planCode = useSelector(state => state?.id?.planCode);
    const proRules = useSelector(state => state?.id?.proRules);
    const userRules = useSelector(state => state?.rules?.rulesJSON?.ALL);
    // const QuotationJSON = useDynamicPath(planCode);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const rules = {
        PGBEN_AGE: {
            below: 18,
            above: 60,
        },
        POL_MODE_OF_PYMT: { H: '2', M: '12', Q: '4', S: '1', Y: '1' },
    };
    const currentMenuId = useSelector(state => state?.tokenAndMenuList?.currentMenuId);
    const proposalStepper = [
        {
            key: 0,
            title: currentMenuId?.ds_type == 1 ? 'Proposal Entry' : 'Policy',
            status: 'inprogress',
        },
        { key: 1, title: 'Life Assured Details', status: 'todo' },
        { key: 2, title: 'Beneficiary', status: 'todo' },
        { key: 3, title: 'Broker/Agent', status: 'todo' },
        { key: 4, title: 'Chrgs/Dis-Load/Cond', status: 'todo' },
        { key: 5, title: 'Checklist', status: 'todo' },
    ];
    const [policyStatus, setPolicyStatus] = useState(false);
    const statusMap = {
        S: { class: 'approved', text: currentMenuId?.ds_type == 1 ? 'Submitted' : 'Approved' },
        P: { class: 'partial', text: 'Partially Submitted' },
        N: { class: 'pending', text: currentMenuId?.ds_type == 1 ? 'Not Submitted' : 'Not Approved' },
    };
    const { class: statusClass = 'pending', text: statusText = 'Not Submitted' } =
        statusMap[policyStatus ? 'S' : 'N'] || {};
    const stepperId = useSelector(state => state?.id?.stepperId);
    const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
    const updateProposalStepperStatus = useApiRequests('updateProposalStepperStatus', 'POST');
    const updateProposalFreezeStatus = useApiRequests('updateProposalFreezeStatus', 'POST');
    const policySubmit = useApiRequests('policySubmit', 'POST');
    const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
    const [lastUpdatedStep, setLastUpdatedStep] = useState(0);
    const { currentStep, stepperData, handleNext, handlePrevious, handleSkip, getNextKey } =
        useStepper(proposalStepper, stepperId);
    const id = useSelector(state => state?.id?.id);
    const formValues = useSelector(state => state?.id?.formValues);
    const freeze = useSelector(state => state?.id?.freezeStatus);
    const prodCode = useSelector(state => state?.id?.prodCode);

    const [loader, setLoader] = useState(false);
    const [showUnderWriter, setShowUnderWriter] = useState(false);
    const [dropDown, setDropDown] = useState(QuotationLov);
    const [proposalNumber, setProposalNumber] = useState('');
    const [successPopup, setSuccessPopup] = useState(false);
    const [isPremCalc, setIsPremCalc] = useState(false);
    const [premDetails, setPremDetails] = useState(null);
    const [userRole, setUserRole] = useState('');

    const handleSkipStep = index => {
        handleSkip(index);
    };

    useEffect(() => {
        // console.log("proRules : ", proRules)s
        if (proposalNumber) {
            handleGetPremiumDetails();
        }
        if (currentMenuId?.ds_type == 2) {
            //    setPolicyStatus(true);
            dispatch(setFreezeStatus(true));
        }
        return () => {
            //    dispatch(setCurrentID(''));
            //    dispatch(setProdCode(''));
            //    dispatch(setPlanCode(''));
            //    dispatch(setFormValues(null));
            //    dispatch(setFreezeStatus(false));
            //    dispatch(setStepperId(0));
            //    dispatch(setProRules(null))
        };
    }, [proposalNumber]);

    const stepperUpdate = async flag => {
        const queryParams = { flag, tranId: id };
        try {
            const response = await updateProposalStepperStatus('', queryParams);
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                setLastUpdatedStep(flag);
            }
        } catch (err) {
            //console.log('err : ', err);
        }
    };

    const freezeUpdate = async flag => {
        const queryParams = {
            flag: flag ? 'Y' : 'N',
            tranId: id,
            ...(flag && { POL_PREM_CALC_YN: 'N' }),
        };
        try {
            const response = await updateProposalFreezeStatus('', queryParams);
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                if (!flag) {
                    setIsPremCalc(false);
                }
                showNotification.SUCCESS(response?.status_msg);
                dispatch(setFreezeStatus(flag));
            }
        } catch (err) {
            //console.log('err : ', err);
        }
    };

    useEffect(() => {
        if (id) {
            const flag = getNextKey(stepperData);
            if (flag > 0 && lastUpdatedStep !== flag) {
                dispatch(setStepperId(flag));
                stepperUpdate(flag);
            }
        }
    }, [stepperData, id]);

    const data = {
        currentStep,
        stepperData,
        handleNext,
        handlePrevious,
        handleSkip,
        id,
        formValues,
        rules,
        QuotationJSON,
        setShowUnderWriter,
        setDropDown,
        dropDown,
        prodCode,
        proposalNumber,
        setProposalNumber,
        freeze,
        planCode,
        isPremCalc,
        setIsPremCalc,
        setPolicyStatus,
        policyStatus,
        premDetails,
        proRules,
        userRules
    };

    const procedureCall = async load => {
        setLoader(load);
        const payload = { inParams: { P_POL_TRAN_ID: id } };
        try {
            const response = await invokeClaimsProcedure(payload, {
                procedureName: 'PREM_CALC',
                packageName: 'WNPKG_PREM_CALC',
            });
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                handleGetPremiumDetails();
                if (load) setIsPremCalc(true);
            }
            setLoader(false);
        } catch (err) {
            setLoader(false);
        }
    };

    const handleClose = () => {
        handleNavigateUW();
        setSuccessPopup(false);
    };

    const handlePolicySubmit = async () => {
        try {
            const response = await policySubmit('', { tranId: id });
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                setUserRole(response?.ROLE);
                handleNext();
                setPolicyStatus(true);
                setSuccessPopup(true);
                showNotification.SUCCESS(response?.status_msg);
            }
        } catch (err) {
            //console.log('err : ', err);
        }
    };

    const handleGetPremiumDetails = async () => {
        try {
            const response = await getMapQuery(
                { queryParams: { POL_NO: proposalNumber } },
                { queryId: 163 },
            );
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                setPremDetails(response?.Data[0]);
            }
        } catch (err) {
            console.log('err : ', err);
        }
    };

    const handleNavigateUW = () => {
        //   if (userRole === 'ADM') {
        dispatch(setPolNum(proposalNumber));
        dispatch(setCustCode(formValues?.frontForm?.formFields?.POL_CUST_CODE?.PFD_FLD_VALUE));
        navigate('/underwriterworkbench');
        //   }
    };

    if (!QuotationJSON) return <Loader />;

    return (
        <StepperContext.Provider value={data}>
            {loader && <Loader />}
            <div className='quotation'>
                <div className='stepper'>
                    <CustomStepper
                        currentStep={currentStep}
                        stepperData={stepperData}
                        handleSkip={handleSkipStep}
                    />
                </div>

                <div className='flex items-center justify-between mb-1 back-button-usercreation-decision'>
                    <div
                        onClick={() => navigate(currentMenuId?.ds_type == 1 ? '/quotationList' : '/policyList')}
                        className='flex items-center'>
                        <i className='bi bi-arrow-left-short' />
                        <p>Back</p>
                    </div>

                    <div>
                        <span className={`status_notify ${statusClass}`}>{statusText}</span>
                    </div>
                </div>
                {/* {currentMenuId?.ds_type == 1 && ( */}
                    <Button
                        onClick={() => {
                            handleNavigateUW();
                        }}>
                        UW
                    </Button>
                {/* )} */}

                <div className='main-screen mt-0'>
                    <ProposalEntry />
                    <div className='mt-3'>
                        <QuotationPanels />
                    </div>
                    {!policyStatus && currentMenuId?.ds_type == 1 && (
                        <div className='mt-6 mb-7'>
                            <Checkbox
                                className='custom-checkbox pl-2'
                                checked={freeze}
                                onChange={e => freezeUpdate(e.target.checked)}>
                                <span className='freeze_style'>Freeze All Changes</span>
                            </Checkbox>

                            <div className='flex justify-center'>
                                <Button disabled={!freeze} className='prem_btn' onClick={() => procedureCall(true)}>
                                    Prem Calc
                                </Button>

                                <Button
                                    disabled={!freeze}
                                    className={isPremCalc ? `sub_btn` : `sub_btn_dis`}
                                    onClick={() => {
                                        handlePolicySubmit();
                                    }}>
                                    Final Submit
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
                {successPopup && <StatusPopup open={successPopup} handleClose={handleClose} status={true} />}
            </div>
        </StepperContext.Provider>
    );
};

export default Quotation;
