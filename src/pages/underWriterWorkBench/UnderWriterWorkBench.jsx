import React, { createContext, useEffect, useState } from 'react';
import PersonalDetailsUnderWriter from './personalDetailsUnderWriter/PersonalDetailsUnderWriter';
import HeaderUnderWriter from './headerUnderWriter/HeaderUnderWriter';
import PremiumDetails from './premiumDetails/PremiumDetails';
import OtherPolicies from './otherPolicies/OtherPolicies';
import Coverage from './coverage/Coverage';
import HistorySlider from '../../components/historySlider/HistorySlider';
import { historyitems } from '../../components/tableComponents/sampleData';
import DecisionDetails from './decisionBox/DecisionDetails';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../../components/notification/Notification';
import { useSelector } from 'react-redux';
import { setCurrentID, setFreezeStatus, setStepperId } from '../../globalStore/slices/IdSlices';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UWPrintDocument from './UWPrintDocument/UWPrintDocument';
import './UnderWriterWorkBench.scss';

export const UWContext = createContext();

const UnderWriterWorkBench = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const POL_NO = useSelector(state => state?.UWId?.POL_NO);
    const CustCode = useSelector(state => state?.UWId?.CustCode);
    const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
    const [proposalList, setProposalList] = useState([]);
    const [policyNumber, setPolicyNumber] = useState('');
    const [tranId, setTranId] = useState('');
    const [policyDetails, setPolicyDetails] = useState(null);
    const [UWPrintOpen, setUWPrintOpen] = useState(false)

    const handleGetProposalList = async () => {
        try {
            const response = await getMapQuery({ queryParams: { CUST_CODE: CustCode } }, { queryId: 164 });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                const findPol = response?.Data?.find(item => {
                    return item?.Policy_Number === POL_NO;
                });
                console.log("findPol : ", findPol, POL_NO, response?.Data)
                if (findPol) {
                    setProposalList(response?.Data);
                    setPolicyNumber(findPol?.Policy_Number);
                    setTranId(findPol?.ID);
                }
            }
        } catch (err) {
            console.log('err : ', err);
        }
    };

    useEffect(() => {
        handleGetProposalList();
    }, []);

    const handlePersonalDetails = async () => {
        try {
            const response = await getMapQuery({ queryParams: { POL_NO: policyNumber } }, { queryId: 162 });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                setPolicyDetails(response?.Data[0]);
            }
        } catch (err) {
            console.log('err : ', err);
        }
    };

    const handleGetHistoryDetails = async () => {
        try {
            const response = await getMapQuery({ queryParams: { tranId } }, { queryId: 202 });
            if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
            if (response?.status === 'SUCCESS') {
                // console.log('History : ', response);
            }
        } catch (err) {
            console.log('err : ', err);
        }
    };

    useEffect(() => {
        if (policyNumber && tranId) {
            handleGetHistoryDetails();
            handlePersonalDetails();
        }
    }, [policyNumber]);

    const navigateToQuotation = () => {
        const foundProposal = proposalList?.find(item => item?.Policy_Number === POL_NO) ?? null;
        if (foundProposal) {
            dispatch(setCurrentID(foundProposal?.ID));
            dispatch(setStepperId(6));
            dispatch(setFreezeStatus(true));
            navigate(`/quotation/${'0'}}`);
        }
    };

    const data = {
        tranId,
        POL_NO,
        policyNumber,
        proposalList,
        setPolicyNumber,
        setTranId,
        policyDetails,
        navigateToQuotation,
    };

    const handleClose = () => {
        setUWPrintOpen(false)
    }

    return (
        <UWContext.Provider value={data}>
            {proposalList?.length > 0 && (
                <div className='under-writer-workbench pl-5 pr-5 pt-3 pb-2'>
                    <button onClick={() => setUWPrintOpen(true)}>Print</button>
                    <HeaderUnderWriter />
                    <div className='historyBox grid grid-cols-12 mt-5'>
                        <div className='col-span-2 title'>Policy Status</div>
                        <div className='historySlider col-span-10'>
                            <HistorySlider items={historyitems} />
                        </div>
                    </div>
                    {policyDetails !== null && <PersonalDetailsUnderWriter />}
                    <div className='premium_policies mt-4'>
                        {policyDetails !== null && <PremiumDetails />}
                        <OtherPolicies />
                    </div>
                    {policyDetails !== null && <Coverage />}

                    <DecisionDetails />

                    {UWPrintOpen && <UWPrintDocument open={UWPrintOpen} handleClose={handleClose} />}
                </div>
            )}
        </UWContext.Provider>
    );
};

export default UnderWriterWorkBench;
