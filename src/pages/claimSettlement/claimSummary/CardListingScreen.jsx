import React, { useEffect, useState } from 'react';
import useMRVListing from '../../../components/mrvListing/useMRVListing';

const CardListingScreen = ({ title = '', queryId, claimTranId, coverId: cptranid }) => {
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const [column, setColumn] = useState(null);

 useEffect(() => {
  handleMRVListing(queryId, claimTranId, cptranid);
 }, []);

 useEffect(() => {
  setColumn(columnData?.length > 0 ? JSON.parse(columnData) : columnData);
 }, [columnData]);

 const renderCards = (item, index) => (
  <div className='col-span-1 card_details'>
   <div className='card_header'>
    <p>{`${title} - ${index + 1}`}</p>
   </div>
   <div className='mt-2 card_body'>
    {Object.keys(column)?.map(key => (
     <div key={key} className='ml-3 mrv_list items-center grid grid-cols-12 mb-1 gap-4'>
      <p className='col-span-6 key_font'>{column[key]}</p>
      <p className='col-span-6 value_font'>{item[key]}</p>
     </div>
    ))}
   </div>
  </div>
 );

 return (
  <div className='settlement_mrv mt-4'>
   {rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0 && column !== null ? (
    <div className='grid grid-cols-2 gap-3'>
     {rowData?.map((item, index) => renderCards(item, index))}
    </div>
   ) : (
    <p>No {title} Found</p>
   )}
  </div>
 );
};

export default CardListingScreen;
