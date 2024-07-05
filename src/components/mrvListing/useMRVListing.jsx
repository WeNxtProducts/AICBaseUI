import { useState } from 'react';
import useApiRequests from '../../services/useApiRequests';

const useMRVListing = () => {
 const getMRVlisting = useApiRequests('getMRVlisting', 'POST');
 const [rowData, setRowData] = useState([]);
 const [columnData, setColumnData] = useState({});

 const handleMRVListing = async (queryId, tranId, ...rest) => {
  const queryParams = { queryId, tranId };
  console.log('rest : ', rest);

  rest.forEach(value => {
   if (value !== undefined) queryParams[`cptranid`] = value;
  });

  try {
   const response = await getMRVlisting('', queryParams);
   if (response?.status === 'SUCCESS') {
    setRowData(response?.Data);
    setColumnData(response?.Heading);
    return true;
   }
  } catch (err) {
   console.log(err);
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
