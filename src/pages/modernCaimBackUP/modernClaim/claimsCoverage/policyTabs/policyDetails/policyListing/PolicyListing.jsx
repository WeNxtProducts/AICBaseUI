import React from 'react';
import { PrinterOutlined } from '@ant-design/icons';
import MRVListingScreen from '../../MRVListingScreen';
import {
 bankData,
 bankColumn,
} from './../../../../../../components/tableComponents/sampleData';

const PolicyListing = () => {
 return (
  <div>
   <div className='print_Setup'>
    <span className='printer_font'>Print</span>
    <PrinterOutlined className='printer_icon' />
   </div>
   <hr className='divider_summary' />
   <div className='p-2 border_left_divider'>
    <MRVListingScreen tableColumn={bankColumn} tableData={bankData} />
   </div>
  </div>
 );
};

export default PolicyListing;
