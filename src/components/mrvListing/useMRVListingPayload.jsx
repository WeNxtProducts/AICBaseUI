import { useState } from 'react';
import useApiRequests from '../../services/useApiRequests';

const useMRVListingPayload = () => {
 const getMRVlistingPayload = useApiRequests('getMRVlistingPayload', 'POST');
 const [rowData, setRowData] = useState([]);
 const [columnData, setColumnData] = useState({});

 const handleMRVListingPayload = async payload => {
  try {
   const response = await getMRVlistingPayload(payload);
   if (response?.status === 'SUCCESS') {
    setRowData(response?.Data);
    setColumnData(response?.Heading);
    return true;
   }
  } catch (err) {
   console.error(err);
   return false;
  }
 };

 return { rowData, columnData, handleMRVListingPayload };
};

export default useMRVListingPayload;
