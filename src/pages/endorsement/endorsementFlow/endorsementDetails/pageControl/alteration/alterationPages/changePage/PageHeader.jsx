import React, { useContext } from 'react';
import { AlterationContext } from '../AlterationPages';

const PageHeader = () => {
 const { selectedAlteration = {} } = useContext(AlterationContext);
 const { title = '', action = '' } = selectedAlteration;

 const renderFields = (label, value) => (
  <div className='flex flex-col gap-2'>
   <p className='head_label'>{label}</p>
   <p className='head_value'>{value}</p>
  </div>
 );

 return (
  <div className='page-header mt-3'>
   <div className='flex items-center justify-between'>
    {renderFields('Endorsement Type', title)}
    {renderFields('Policy Reference no', 'E/0100/202993/093838')}
    {renderFields('Policy Number', 'P/100/23/0992/2000')}
    {renderFields('Endt. Date', '12 Mar 2025')}
   </div>
  </div>
 );
};

export default PageHeader;
