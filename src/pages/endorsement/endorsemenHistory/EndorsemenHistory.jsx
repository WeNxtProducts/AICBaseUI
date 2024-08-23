import React from 'react';
import HistorySlider from '../../../components/historySlider/HistorySlider';
import { historyitems } from '../../../components/tableComponents/sampleData';

const EndorsemenHistory = () => {
 return (
  <div className='historyBox grid grid-cols-12 mt-3'>
   <div className='col-span-2 title'>Policy Status</div>
   <div className='historySlider col-span-10'>
    <HistorySlider items={historyitems} />
   </div>
  </div>
 );
};

export default EndorsemenHistory;
