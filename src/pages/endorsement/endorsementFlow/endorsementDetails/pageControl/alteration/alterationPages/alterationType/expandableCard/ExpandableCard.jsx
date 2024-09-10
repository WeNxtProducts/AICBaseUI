import React from 'react';
import './ExpandableCard.scss';

const DetailCard = ({ alterationType, handleSelectedAlteration }) => {
 const { title = '', desc = '', option = false } = alterationType;

 return (
  <div className='card'>
   <div className='card-header'>
    <p className='tite-font'>{title}</p>
    {!option && (
     <button onClick={() => handleSelectedAlteration(alterationType)} className='card_btn'>
      + Add
     </button>
    )}
   </div>
   <div className='card-description'>
    {!option ? (
     <p className='desc_style'>{desc}</p>
    ) : (
     <div className='rider_card flex flex-col mt-2 px-4'>
      <div>
       <p> Addition of Rider</p>
       <button
        onClick={() => handleSelectedAlteration({ ...alterationType, action: 'add' })}
        className='action_btn'>
        + Add
       </button>
      </div>
      <div>
       <p> Deletion of Rider</p>
       <button
        onClick={() => handleSelectedAlteration({ ...alterationType, action: 'delete' })}
        className='action_btn'>
        + Add
       </button>
      </div>
     </div>
    )}
   </div>
  </div>
 );
};

const ExpandableCard = ({ options, handleSelectedAlteration }) => {
 return (
  <div className='alteration_type_select_card'>
   {options?.map(item => (
    <DetailCard
     key={item?.key}
     alterationType={item}
     handleSelectedAlteration={handleSelectedAlteration}
    />
   ))}
  </div>
 );
};

export default ExpandableCard;
