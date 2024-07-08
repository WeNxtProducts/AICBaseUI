import React, { useContext, useEffect, useState } from 'react';
import LifeAssuredActions from './LifeAssuredActions';
import LifeAssuredDetailsForm from './LifeAssuredDetailsForm';
import CustomList from '../../../../components/customList/CustomList';
import { StepperContext } from '../../Quotation';
import { getQueryId } from '../../../../components/commonHelper/QueryIdFetch';
import useMRVListing from '../../../../components/mrvListing/useMRVListing';

const LifeAssuredDetails = () => {
 const { id: tranId, formData } = useContext(StepperContext);
 const { mrvListingId } = formData;
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const [editData, setEditData] = useState(null);

 useEffect(() => {
  if (tranId) {
   const queryId = getQueryId('Life Assured Details', mrvListingId);
   handleMRVListing(queryId, tranId);
  }
 }, []);

 const handleEdit = item => {
  // console.log('handleEdit : ', item);
  setEditData(item);
 };

 return (
  <div className='front-form life-assured-details grid grid-cols-8 gap-1'>
   {rowData?.length > 0 && (
    <div className='inline-table-details mb-1 col-span-8 mt-2'>
     <CustomList
      tableColumn={columnData}
      tableData={rowData}
      handleEdit={handleEdit}
     />
    </div>
   )}
   <div className='propasal-entry-form col-span-7'>
    <LifeAssuredDetailsForm initValues={editData} setInitValue={setEditData} />
   </div>
   <div className='col-span-1 mt-3'>
    <LifeAssuredActions />
   </div>
  </div>
 );
};

export default LifeAssuredDetails;
