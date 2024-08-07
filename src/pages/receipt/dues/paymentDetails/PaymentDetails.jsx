import React from 'react';
import PayForm from './PayForm';
import DueMrvListing from '../../dueMrvListing/DueMrvListing';
import {
 payHeader,
 payData,
} from '../../../../components/tableComponents/sampleData';

const PaymentDetails = () => {
 return (
  <div className='pay_details mt-10'>
   <div className='grid grid-cols-8'>
    <div className='col-span-6'>
     <p className='pay_title'>Payment Details</p>
     <PayForm />
    </div>
    <div className='col-span-2 mrv_col'>
     <DueMrvListing tableColumn={payHeader} tableData={payData} />
    </div>
   </div>
  </div>
 );
};

export default PaymentDetails;
