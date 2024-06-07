import React from 'react';
import { Checkbox, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { mailList } from '../../../components/tableComponents/sampleData';
import './MailCheckListing.scss';

const MailCheckListing = () => {
 const fieldSize = '3/4';

 return (
  <div className={`transfer_box w-${fieldSize}`}>
   <div className='p-1 all_check'>
    <Checkbox /> <span className='ml-2 checkbox_val'>0 mail selected</span>
    <hr className='box_divider mt-1' />
   </div>

   <div className='pl-1 mt-1 pr-1'>
    <Input placeholder='Search' prefix={<SearchOutlined />} />
    {mailList?.map(item => (
     <div key={item?.value} className='pb-1 pt-1'>
      <Checkbox
       onChange={e => {
        console.log('e.target.value : ', e.target.value);
       }}
       value={item.value}>
       <span className='mail_name'>{item.label}</span>
      </Checkbox>
     </div>
    ))}
   </div>
  </div>
 );
};

export default MailCheckListing;
