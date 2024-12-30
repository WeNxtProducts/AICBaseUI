import React from 'react';
import MRVListingScreen from '../../MRVListingScreen';
import { bankData, bankColumn } from './../../../../../../components/tableComponents/sampleData';

const PolicyListing = () => {
 return (
  <div>
   <div className='p-2 border_left_divider'>
    <MRVListingScreen tableColumn={bankColumn} tableData={bankData} />
   </div>
  </div>
 );
};

export default PolicyListing;
