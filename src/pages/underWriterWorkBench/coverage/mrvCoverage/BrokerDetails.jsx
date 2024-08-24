import React, { useEffect } from 'react';
import useMRVListing from '../../../../components/mrvListing/useMRVListing';

const BrokerDetails = ({ brokerId, code }) => {
 const { rowData, columnData, handleMRVListing } = useMRVListing();
 const data = [
  {
   'Commission Code': '001',
   'Year From': 2024,
   'Year To': 2029,
   Rate: 100,
   'Rate Per': 12,
  },
  {
   'Commission Code': '001',
   'Year From': 2024,
   'Year To': 2029,
   Rate: 100,
   'Rate Per': 12,
  },
 ];

 const Heading = JSON.parse(
  '{"Commission Code":"Commission Code","Year From":"Year From","Year To":"Year To","Rate":"Rate","Rate Per":"Rate Per"}',
 );

 const columns = Object.keys(Heading);

 useEffect(() => {
  handleMRVListing(205, brokerId);
 }, [brokerId]);

 useEffect(() => {
  console.log('brokerId : ', brokerId, rowData);
 }, [rowData]);

 return (
  <div className='broker_content'>
   <div className='broker_title flex items-center'>
    <p className='broker_text'>Broker Detail - {code}</p>
   </div>
   <div className='flex items-center justify-center'>
    <table className='custom-table'>
     <thead>
      <tr>
       {columns.map(key => (
        <th key={key}>{Heading[key]}</th>
       ))}
      </tr>
     </thead>
     <tbody>
      {data.map((row, index) => (
       <tr key={index}>
        {columns.map(key => (
         <td key={key}>{row[key]}</td>
        ))}
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  </div>
 );
};

export default BrokerDetails;
