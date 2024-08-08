import React, { useEffect } from 'react';
import { Tooltip } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import Slider from 'react-slick';

function SampleNextArrow(props) {
 const { className, style, onClick } = props;
 return (
  <div onClick={onClick} className={`arrow ${className}`}>
   <AiOutlineRight className='arrows' />
  </div>
 );
}

const SamplePrevArrow = props => {
 const { className, style, onClick } = props;
 return (
  <div onClick={onClick} className={`arrow ${className}`}>
   <AiOutlineLeft className='arrows' />
  </div>
 );
};

const DueMrvListing = ({
 tableColumn = '',
 tableData = [],
 handleEdit,
 handleDelete,
 selectedRow = '',
 action,
 isView = true,
 freeze = false,
 highlightKey = 'ID',
 isSlide = false,
}) => {
 const column = tableColumn?.length > 0 ? JSON.parse(tableColumn) : tableColumn;

 //  useEffect(() => {
 //   scrollToView(selectedRow);
 //  }, [selectedRow,tableData]);

 const scrollToView = id => {
  const panel = document.querySelector(`[data-id='${id}']`);
  console.log('panel : ', panel);
  if (panel) {
   panel.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }
 };

 const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  arrows: true,
  slidesToShow: 4,
  slidesToScroll: 2,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,
  responsive: [
   {
    breakpoint: 1024,
    settings: {
     slidesToShow: 2,
     slidesToScroll: 1,
    },
   },
   {
    breakpoint: 600,
    settings: {
     slidesToShow: 1,
     slidesToScroll: 1,
    },
   },
  ],
 };

 const renderCards = (item, index) => (
  <div
   data-id={item?.[highlightKey]}
   key={item?.[highlightKey]}
   className={
    selectedRow == item?.[highlightKey]
     ? 'list_card_highlighted_row'
     : 'list_card'
   }>
   <div
    className={`action_header flex item-center justify-${
     action && !freeze ? 'between' : 'between'
    }`}>
    <div
     onClick={e => {
      handleDelete(item);
     }}
     className='pl-2 flex items-center'>
     <div className='mrv_checkbox'>
      <input
       readOnly
       //checked={item?.isSelected === 'Y'}
       checked={true}
       id={index}
       type='checkbox'
      />
      <label />
     </div>
     {isSlide && <p className='pl-3 count_style'>Due {index + 1}</p>}
    </div>

    <div className='flex gap-2 pe-3 p-1'>
     {isView && (
      <Tooltip title='View'>
       <EyeOutlined onClick={() => handleEdit(item)} className='mrv_icons' />
      </Tooltip>
     )}
    </div>
   </div>

   {Object.keys(column)?.map(key => (
    <div
     key={key}
     className='ml-3 mrv_list items-center grid grid-cols-12 gap-1'>
     <p className='col-span-6 key_font'>{column[key]}</p>
     <p className='col-span-6 value_font'>{item[key]}</p>
    </div>
   ))}
  </div>
 );

 return (
  <div className={`MRV_card MRV_card--flex ${isSlide ? '' : 'overflow-y-auto p-2'}`}>
   {isSlide ? (
    <Slider {...settings}>
     {tableData?.map((item, index) => renderCards(item, index))}
    </Slider>
   ) : (
    tableData?.map((item, index) => renderCards(item, index))
   )}
  </div>
 );
};

export default DueMrvListing;
