import { useState } from 'react';
import useApiRequests from '../../services/useApiRequests';

const useMRVListing = () => {
 const getMRVlisting = useApiRequests('getMRVlisting', 'POST');
 const [rowData, setRowData] = useState([]);
 const [columnData, setColumnData] = useState({});

 const handleMRVListing = async (queryId, tranId, ...rest) => {
  const queryParams = { queryId, tranId };

  const keyName = ['emptranId', 'mhtranId'];
  if (rest?.length > 0) {
   keyName.forEach((key, index) => {
    if (rest[index]) {
     queryParams[key] = rest[index];
    }
   });
  }

  //   rest.forEach((value, index) => {
  //    if (value !== undefined) queryParams[`emptranId`] = value;
  //   });

  try {
   const response = await getMRVlisting('', queryParams);
   if (response?.status === 'SUCCESS') {
    setRowData(response?.Data);
    setColumnData(response?.Heading);
    return true;
   }
  } catch (err) {
   console.error(err);
   return false;
  } finally {
   const panel = document.querySelector(`[data-id='dept-1']`);
   if (panel) {
    setTimeout(() => {
     panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 300);
   }
  }
 };

 return { rowData, columnData, handleMRVListing };
};

export default useMRVListing;
