import { InfoCircleOutlined } from '@ant-design/icons';
import React, { useContext } from 'react';
import { CustomSelect } from '../../../../../../../../../components/commonExportsFields/CommonExportsFields';
import { AlterationContext } from './../../AlterationPages';
import { termSelect } from '../../../../../../../../../components/tableComponents/sampleData';

const MOPChange = () => {
 const { alterationType, setSelectedAlteration, selectedAlteration } =
  useContext(AlterationContext);
 const { key } = selectedAlteration;

 const handlePrev = () => {
  setSelectedAlteration(null);
 };

 return (
  <div className='alter_change_page'>
   <div className='flex items-center'>
    <p className='change_style'>Endorsement Details</p>
    <div className='prem_calc_msg'>
     <span className='circle-tick' /> <p>Premium Calculated !!!</p>
    </div>
   </div>
   <div className='change-table'>
    <table className='alter_table alter_full_half'>
     <thead>
      <tr>
       <th />
       <th>
        TERM <InfoCircleOutlined className='inf_icons' />
       </th>
      </tr>
     </thead>
     <tbody>
      <tr>
       <td>OLD {key === 2 ? 'MOP' : 'TERM'}</td>
       <td>Half-Yearly</td>
      </tr>
      <tr>
       <td>NEW {key === 2 ? 'MOP' : 'TERM'}</td>
       <td>
        <CustomSelect
         options={termSelect}
         showSearch={false}
         size='large'
         placeholder={'enter mop'}
         value={undefined}
         onChange={e => {
          console.log(e);
         }}
        />
       </td>
      </tr>
     </tbody>
    </table>
   </div>

   <div className='nav_buttons'>
    <button onClick={() => handlePrev()}>Back</button>
    <button>Premium calc</button>
   </div>

   <div className='mdified_data'>
    <hr />
    <div className='modified_grid'>
     <p className='prem_style'>Modified {key === 2 ? 'MOP' : 'TERM'}</p>

     <div className='modfied-table'>
      <table className='mo-table'>
       <thead>
        <tr>
         <th>
          {key === 2 ? 'OLD MOP' : 'OLD TERM'} <InfoCircleOutlined className='inf_icons' />
         </th>
         <th>
          {key === 2 ? 'NEW MOP' : 'NEW TERM'} <InfoCircleOutlined className='inf_icons' />
         </th>
        </tr>
       </thead>
       <tbody>
        <tr>
         <td>Half-Yearly</td>
         <td>Anually</td>
        </tr>
       </tbody>
      </table>
      <div className='modfied_action'>
       <div className='nav_buttons'>
        <button>Back</button>
        <button>Print</button>
        <button>Summary</button>
        <button>Proceed To UW</button>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default MOPChange;
