import React, { createContext, lazy, useEffect, useState } from 'react';
import EndorsementHeader from './endorsementHeader/EndorsementHeader';
import EndorsemenHistory from './endorsemenHistory/EndorsemenHistory';
import EndorsementFlow from './endorsementFlow/EndorsementFlow';
import { useSelector } from 'react-redux';
import useApiRequests from '../../services/useApiRequests';
import showNotification from '../../components/notification/Notification';
const AlterationPages = lazy(
  () =>
    import(
      './endorsementFlow/endorsementDetails/pageControl/alteration/alterationPages/AlterationPages'
    ),
);
import './Endorsement.scss';

export const EndorsementContext = createContext();

const Endorsement = () => {
  const EndoDetail = useSelector(state => state?.Endo);
  const { POL_NO, tranId, CUST_CODE } = EndoDetail
  const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
  const [showAlteration, setShowAlteration] = useState(false);
  const [policyHistory, setPolicyHistory] = useState(null);

  const data = {
    showAlteration, setShowAlteration, POL_NO, tranId, CUST_CODE,
    policyHistory, setPolicyHistory
  };

  const handlePoicyHistory = async () => {
    try {
      const response = await getMapQuery({ queryParams: { POL_NO } }, { queryId: 220 });
      if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
      if (response?.status === 'SUCCESS') {
        setPolicyHistory(response?.Data[0])
      }
    } catch (err) {
      console.log('err : ', err);
    }
  };

  useEffect(() => {
    if (POL_NO) handlePoicyHistory()
  }, [POL_NO, tranId])

  return (
    <EndorsementContext.Provider value={data}>
      <div className='endorsement mb-5'>
        <div style={{ display: showAlteration ? 'block' : 'none' }}>
          <AlterationPages />
        </div>

        <div style={{ display: showAlteration ? 'none' : 'block' }} className='main_wrapper'>
          <EndorsementHeader />
          <EndorsemenHistory />
          {policyHistory !== null &&
            <EndorsementFlow />
          }
        </div>
      </div>
    </EndorsementContext.Provider>
  );
};

export default Endorsement;
