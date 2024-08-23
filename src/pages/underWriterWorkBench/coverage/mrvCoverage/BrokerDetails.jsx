import React, { useEffect } from 'react';
import useMRVListing from '../../../../components/mrvListing/useMRVListing';

const BrokerDetails = ({ brokerId, tranId }) => {
 const { rowData, columnData, handleMRVListing } = useMRVListing();

 useEffect(() => {
  handleMRVListing(205, brokerId);
 }, [brokerId]);

 useEffect(() => {
  console.log('brokerId : ', brokerId, rowData);
 }, [rowData]);

 return (
  <div className='broker_content'>
   <div className='broker_title flex items-center'>
    <p className='broker_text'>Broker Detail</p>
   </div>
  </div>
 );
};

export default BrokerDetails;
