import React, { useContext } from 'react';
import {
 CustomDatePicker,
 CustomTextArea,
} from '../../../../../../../../../components/commonExportsFields/CommonExportsFields';
import { termSelect } from '../../../../../../../../../components/tableComponents/sampleData';
import { InfoCircleOutlined } from '@ant-design/icons';
import { AlterationContext } from '../../AlterationPages';

const Cancellation = () => {
 const { alterationType, setSelectedAlteration, selectedAlteration } =
  useContext(AlterationContext);
 const { key } = selectedAlteration;

 const handlePrev = () => {
  setSelectedAlteration(null);
 };

 return (
  <div className='alter_change_page'>
   <div className='grid grid-cols-2 mt-3'>
    <div className='col-span-1'>
     <div className='flex items-center'>
      <p className='change_style'>Endorsement Details</p>
      <div className='prem_calc_msg'>
       <span className='circle-tick' /> <p>Premium Calculated !!!</p>
      </div>
     </div>
     <div className='change-table'>
      <table className='alter_table alter_left_half'>
       <tbody>
        <tr>
         <td>Cancellation Effecive from</td>
         <td>
          <CustomDatePicker
           placeholder='date'
           size='large'
           value={''}
           onChange={date => {
            console.log(date);
           }}
          />
         </td>
        </tr>
        <tr>
         <td>Reason</td>
         <td>
          <CustomTextArea
           value={''}
           placeholder='reason'
           onChange={e => {
            console.log(e.target.value);
           }}
          />
         </td>
        </tr>
       </tbody>
      </table>
     </div>
     <div className='nav_buttons nav_buttons_right'>
      <button onClick={() => handlePrev()}>Back</button>
      <button>Premium calc</button>
     </div>
    </div>
    <div className='col-span-1 cancel_summary flex flex-col items-center'>
     <p>Premium Summary</p>
     <p>Cancellation Summary</p>
     <div className='premium_summary'>
      <p>hello</p>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Cancellation;
