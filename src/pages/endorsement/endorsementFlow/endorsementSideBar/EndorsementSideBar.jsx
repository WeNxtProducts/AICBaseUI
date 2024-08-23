import React from 'react';

const EndorsementSideBar = () => {
 const selected = 0;
 const side_items = [
  { label: 'Policy Details', value: 0 },
  { label: 'Alteration', value: 1 },
  { label: 'Policy Details', value: 2 },
  { label: 'Withdrawal Details', value: 3 },
  { label: 'Loan Details', value: 4 },
  { label: 'Bonus Details', value: 5 },
  { label: 'Surr/Maturity Details', value: 6 },
 ];

 return (
  <div className='endorsement_sidebar'>
   <div className='list_item_box'>
    {side_items?.map((item, index) => (
     <div
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
