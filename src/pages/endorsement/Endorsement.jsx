import React, { createContext, lazy, useEffect, useState } from 'react';
import EndorsementHeader from './endorsementHeader/EndorsementHeader';
import EndorsemenHistory from './endorsemenHistory/EndorsemenHistory';
import EndorsementFlow from './endorsementFlow/EndorsementFlow';
import './Endorsement.scss';
import { useSelector } from 'react-redux';
const AlterationPages = lazy(
  () =>
    import(
      './endorsementFlow/endorsementDetails/pageControl/alteration/alterationPages/AlterationPages'
    ),
);

export const EndorsementContext = createContext();

const Endorsement = () => {
  const EndoDetail = useSelector(state => state?.Endo);
  const { POL_NO, tranId } = EndoDetail
  const [showAlteration, setShowAlteration] = useState(false);

  const data = {
    showAlteration, setShowAlteration, POL_NO, tranId
  };

  useEffect(() => {
    console.log("EndoDetail : ", EndoDetail)
  }, []);

  return (
    <EndorsementContext.Provider value={data}>
      <div className='endorsement mb-5'>
        <div style={{ display: showAlteration ? 'block' : 'none' }}>
          <AlterationPages />
        </div>

        <div style={{ display: showAlteration ? 'none' : 'block' }} className='main_wrapper'>
          <EndorsementHeader />
          <EndorsemenHistory />
          <EndorsementFlow />
        </div>
      </div>
    </EndorsementContext.Provider>
  );
};

export default Endorsement;
