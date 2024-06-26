import React, { useContext, useEffect, useState } from 'react';
import useMRVListing from '../../../../../components/mrvListing/useMRVListing';
import { ClaimContext } from '../../../ModernClaim';

const Bonus = () => {
 const {
  selectedPolDetails: { CLM_TRAN_ID },
 } = useContext(ClaimContext);
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const [column, setColumn] = useState(null);

 useEffect(() => {
  handleMRVListing(122, CLM_TRAN_ID);
 }, []);

 useEffect(() => {
  setColumn(columnData?.length > 0 ? JSON.parse(columnData) : columnData);
 }, [rowData]);

 const renderRows = (item, index) => (
  <div key={`${index}-bonus`} className='col-span-5 p-2 field_val_style_bonus'>
   {Object.keys(column)?.map(key => (
    <div
     key={key}
     className='ml-3 mrv_list items-center grid grid-cols-12 mb-1'>
     <p className='col-span-6 key_font'>{column[key]}</p>
     <p className='col-span-6 value_font'>{item[key]}</p>
    </div>
   ))}
   {/* <div className='grid grid-cols-7'>
    <p className='col-span-3 bonus_key'>Code</p>
    <p className='col-span-4 bonus_val'>AAAAAA</p>
   </div>
   <div className='grid grid-cols-7'>
    <p className='col-span-3 bonus_key'>Amount FC</p>
    <p className='col-span-4 bonus_val'>10,000</p>
   </div>
   <div className='grid grid-cols-7'>
    <p className='col-span-3 bonus_key'>Amount LC</p>
    <p className='col-span-4 bonus_val'>10,000</p>
   </div> */}
  </div>
 );

 return (
  <div className='pl-4'>
   <p className='breakup_title'>Bonus</p>
   <div className='breakUpContent p-1'>
    {rowData?.length > 0 && column !== null && (
     <div className='grid grid-cols-10 items-center gap-y-3 gap-x-3'>
      {rowData?.map((item, index) => renderRows(item, index))}
     </div>
    )}

    {/* <div className='mt-7 field_name_style flex justify-center items-center gap-5'>
     <p>Total Bonus</p>
     <div className='total_value'> </div>
    </div> */}
   </div>
  </div>
 );
};

export default Bonus;
