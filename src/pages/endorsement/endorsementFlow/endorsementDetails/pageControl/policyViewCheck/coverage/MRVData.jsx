import React, { useContext, useEffect, useState } from 'react';
import MRVCoverage from './MRVCoverage';
import useMRVListing from '../../../../../../../components/mrvListing/useMRVListing';

const MRVData = ({ queryId, heading, tranId }) => {
 const { rowData, columnData, handleMRVListing } = useMRVListing();

 useEffect(() => {
  handleMRVListing(queryId, tranId);
 }, [tranId]);

 const hasValidRowData = rowData => {
  return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
 };

 return (
  <div className='mrv_data'>
   {hasValidRowData(rowData) && (
    <MRVCoverage tableColumn={columnData} tableData={rowData} heading={heading} tranId={tranId} />
   )}
  </div>
 );
};

export default MRVData;