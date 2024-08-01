import React from 'react';
import { Button } from 'antd';
import {
 colHeader,
 dueDates,
} from '../../../../components/tableComponents/sampleData';
import DueMrvListing from '../../dueMrvListing/DueMrvListing';
import DueInfo from './DueInfo';

const DueDetails = () => {
 return (
  <div className='due_details'>
   <div className='header'>
    <p className='due_count'>
     Total Dues <span>06</span>
    </p>
    <Button className='save-btn'>Save</Button>
   </div>
   <div className='due_content'>
    <DueMrvListing tableColumn={colHeader} tableData={dueDates} />
    <DueInfo />
   </div>
  </div>
 );
};

export default DueDetails;
