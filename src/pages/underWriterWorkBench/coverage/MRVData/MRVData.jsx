import React, { useContext, useEffect, useState } from 'react';
import useMRVListing from '../../../../components/mrvListing/useMRVListing';
import { UWContext } from './../../UnderWriterWorkBench';
import MRVCoverage from '../mrvCoverage/MRVCoverage';

const MRVData = ({ queryId, heading, tranId }) => {
 const { rowData, columnData, handleMRVListing } = useMRVListing();

 useEffect(() => {
  handleMRVListing(queryId, tranId);
 }, []);

 const hasValidRowData = rowData => {
  return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
 };

 return (
  <div className='mrv_data'>
   {hasValidRowData(rowData) && (
    <MRVCoverage tableColumn={columnData} tableData={rowData} heading={heading} />
   )}
  </div>
 );
};

export default MRVData;
