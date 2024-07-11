import React, { useContext, useEffect, useState } from 'react';
import LifeAssuredActions from './LifeAssuredActions';
import LifeAssuredDetailsForm from './LifeAssuredDetailsForm';
import CustomList from '../../../../components/customList/CustomList';
import { StepperContext } from '../../Quotation';
import { getQueryId } from '../../../../components/commonHelper/QueryIdFetch';
import useMRVListing from '../../../../components/mrvListing/useMRVListing';

const LifeAssuredDetails = () => {
 const { id: tranId, QuotationJSON } = useContext(StepperContext);
 const { mrvListingId } = QuotationJSON;
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
  <div className='front-form life-assured-details grid grid-cols-5 gap-1'>
   <div className='propasal-entry-form col-span-4'>
    <LifeAssuredDetailsForm initValues={editData} setInitValue={setEditData} />
   </div>
   <div className='col-span-1 mt-3'>
    <LifeAssuredActions />
   </div>
  </div>
 );
};

export default LifeAssuredDetails;
