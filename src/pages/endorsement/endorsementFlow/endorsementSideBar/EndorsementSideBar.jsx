import React, { useContext, useState } from 'react';
import { PageHandleContext } from '../EndorsementFlow';

const side_items = [
 { label: 'Policy Details', value: 0 },
 { label: 'Alteration', value: 1 },
 { label: 'Claim Details', value: 2 },
 { label: 'Loan Details', value: 3 },
 { label: 'Surr/Maturity Details', value: 4 },
];

const EndorsementSideBar = () => {
 const { selected, setSelected } = useContext(PageHandleContext);

 const handleSelectedTab = tabVal => {
  setSelected(tabVal);
 };

 return (
  <div className='endorsement_sidebar'>
   <div className='list_item_box'>
    {side_items?.map((item, index) => (
     <div
      onClick={() => handleSelectedTab(item?.value)}
      key={item?.value}
      className={`label_wrap ${index === selected ? 'label_wrap_selected' : ''}`}>
      <p className='label_text'>{item?.label}</p>
     </div>
    ))}
   </div>
  </div>
 );
};

export default EndorsementSideBar;
