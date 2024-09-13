import React, { useContext, useEffect, useState } from 'react';
import useMRVListing from '../../../../../components/mrvListing/useMRVListing';
import { ClaimContext } from '../../../ModernClaim';

const Bonus = ({ listingId, page }) => {
 const {
  selectedPolDetails: { CLM_TRAN_ID },
 } = useContext(ClaimContext);
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const [column, setColumn] = useState(null);

 useEffect(() => {
  handleMRVListing(listingId, CLM_TRAN_ID);
 }, []);

 useEffect(() => {
  setColumn(columnData?.length > 0 ? JSON.parse(columnData) : columnData);
 }, [rowData]);

 const renderRows = (item, index) => (
  <div key={`${index}-bonus`} className='col-span-5 p-2 field_val_style_bonus'>
   {Object.keys(column)?.map(key => (
    <div key={key} className='ml-3 mrv_list items-center grid grid-cols-12 mb-1'>
     <p className='col-span-6 key_font'>{column[key]}</p>
     <p className='col-span-6 value_font'>{item[key]}</p>
    </div>
   ))}
  </div>
 );

 return (
  <div className={`pl-${page === 'Bonus' ? '4' : '0'}`}>
   <p className='breakup_title'>{page}</p>
   <div className='breakUpContent p-1 mt-2'>
    {rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0 && column !== null && (
     <div className='grid grid-cols-10 items-center gap-y-3 gap-x-3'>
      {rowData?.map((item, index) => renderRows(item, index))}
     </div>
    )}
   </div>
  </div>
 );
};

export default Bonus;
