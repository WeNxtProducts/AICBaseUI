import React, { useEffect, useContext, useState } from 'react';
import PremiumView from './PremiumView';
import OtherPolicies from './OtherPolicies';
import Coverage from './coverage/Coverage';
import { EndorsementContext } from '../../../../Endorsement';
import showNotification from '../../../../../../components/notification/Notification';

const PolicyViewCheck = ({ currentTab, dataLoaded }) => {
    const { POL_NO, tranId } = useContext(EndorsementContext);
    const [proposalList, setProposalList] = useState(null)
    const [policyNumber, setPolicyNumber] = useState('');
    const [tranIdPolicy, setTranIdPolicy] = useState('')

    useEffect(() => {
        if (dataLoaded) console.log('PolicyViewCheck ');
    }, [dataLoaded]);

    return (
        <div className='policy_view_check'>
            <div className='premium_policies mt-4'>
                <PremiumView policyNumber={policyNumber} dataLoaded={dataLoaded} />
                <OtherPolicies setProposalList={setProposalList} proposalList={proposalList}
                    policyNumber={policyNumber} setPolicyNumber={setPolicyNumber}
                    dataLoaded={dataLoaded} setTranIdPolicy={setTranIdPolicy} />
            </div>
            <Coverage policyNumber={policyNumber} dataLoaded={dataLoaded} tranIdPolicy={tranIdPolicy} />
        </div>
    );
};

export default PolicyViewCheck;
