import React from 'react';
import ListDetails from './ListDetails';
import MRVListingScreen from '../MRVListingScreen';
import { bankColumn, bankData } from '../../../../../components/tableComponents/sampleData';

const Checklist = () => {
 return (
  <div className='grid grid-cols-7 py-1 pe-1'>
   <div className='col-span-5 pe-2'>
    <ListDetails />
   </div>
   <div className='col-span-2 p-2 border_left_divider'>
    <MRVListingScreen tableColumn={bankColumn} tableData={bankData} />
   </div>
  </div>
 );
};

export default Checklist;
