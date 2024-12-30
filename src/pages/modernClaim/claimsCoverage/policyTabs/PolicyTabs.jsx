import React, { useContext, useState } from 'react';
import { Tab, Tabs } from '../../../../components/customTabs/Tabs';
import PolicyDetails from './policyDetails/PolicyDetails';
import MRVClaim from './mrvClaim/MRVClaim';
import DeductionAndBonus from './deductionAndBonus/DeductionAndBonus';
import ReInsurance from './reInsurance/ReInsurance';
import { ClaimContext } from '../../ModernClaim';
import Bonus from './deductionAndBonus/Bonus';
import Checklist from './checklist/Checklist';

const PolicyTabs = () => {
    const { formValues, selectedPolDetails, selectedPolicy } = useContext(ClaimContext);
    const { CLM_FRZ_YN, CLM_TRAN_ID, CLM_STATUS, CLM_STATUS_CODE } = selectedPolDetails;
    const [activeTab, setActiveTab] = useState(0);

    const handleTabClick = index => {
        setActiveTab(index);
        setTimeout(() => scrollToView(), 100);
    };

    const scrollToView = () => {
        const panel = document.querySelector(`[data-id='${'claim_tabs'}']`);
        if (panel) {
            panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    return (
        <div>
            <Tabs activeTab={activeTab} onTabClick={handleTabClick}>
                <Tab label='Claim Details'>
                    {/* <PolicyDetails /> */}
                    <MRVClaim // getClaimCoverDis ClaimCoverDetailsList
                        queryID={`${formValues?.CH_CLAIM_TYPE !== 'O' ? 'getClaimCoverDis' : 'ClaimCoverDetailsList'
                            }`}
                        root={`${formValues?.CH_CLAIM_TYPE !== 'O' ? 'ClaimCoverDis' : 'ClaimCover'}`}
                        mrvGet='getClaimCoverDetailsEdit'
                        screenCode='CLAIMENTRY'
                        screenName='CLAIMENTRY'
                        saveRow='claimCoverCreate'
                        editRow='claimCoverUpdate'
                        deleteRow='claimCoverDelete'
                        title='Claim Cover'
                    />
                </Tab>
                <Tab label='Charges'>
                    <MRVClaim
                        queryID='ClaimChargeDetailsList'
                        root='ClaimCharges'
                        mrvGet='getClaimChargesDetailsEdit'
                        screenCode='CLAIMENTRY'
                        screenName='CLAIMENTRY'
                        saveRow='claimChargeCreate'
                        editRow='claimChargeUpdate'
                        deleteRow='claimChargeDelete'
                        title='Claim Charges'
                    />
                </Tab>
                <Tab label='Ded & Bonus'>
                    <DeductionAndBonus />
                </Tab>
                <Tab label='Pay To'>
                    <MRVClaim
                        queryID='ClaimPayToDetailsList'
                        root='ClaimBeneficiary'
                        mrvGet='getClaimPayToDetailsEdit'
                        screenCode='CLAIMENTRY'
                        screenName='CLAIMENTRY'
                        saveRow='claimBfcryCreate'
                        editRow='claimBfcryUpdate'
                        deleteRow='claimBfcryDelete'
                        title='Pay To'
                    />
                </Tab>
                <Tab label='Checklist'>
                    <Checklist tranId={CLM_TRAN_ID} proposalNumber={selectedPolicy} queryID={149} freeze={false} />
                </Tab>
                <Tab label='RI'>
                    <ReInsurance />
                </Tab>
                <Tab label='History'>
                    {/* <MRVClaim
                        queryID='ClaimHistoryDetailsList'
                        root='ClaimHistory'
                        mrvGet='getClaimHistoryDetailsEdit'
                        screenCode='CLAIMENTRY'
                        screenName='CLAIMENTRY'
                        saveRow='saveDocPrint'
                        editRow='editDocPrint'
                        deleteRow='deleteDocPrint'
                        title='History'
                        action={false}
                        isView={true}
                        isEdit={false}
                        isDelete={false}
                    /> */}
                    <Bonus listingId={114} page='History' />
                </Tab>
            </Tabs>
        </div>
    );
};

export default PolicyTabs;
