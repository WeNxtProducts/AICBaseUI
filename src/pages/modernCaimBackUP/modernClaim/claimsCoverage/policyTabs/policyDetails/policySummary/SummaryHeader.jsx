import { Checkbox, Select } from 'antd';
import { notification_options } from '../../../../../../components/tableComponents/sampleData';

const SummaryHeader = () => {
 return (
  <div className='summary_header'>
   <div>
    <span className='check_box_label'>Process Y/N</span> <Checkbox />
   </div>
   <div>
    <span className='check_box_label'>Approve Y/N</span> <Checkbox />
   </div>
   <div>
    <span className='check_box_label'>Reject Y/N</span> <Checkbox />
   </div>
   <div>
    <span className='check_box_label'>Reason to reject</span>
    <Select className='reason_select_box' placeholder='Reason'>
     {notification_options?.map(item => (
      <Select.Option key={item.value} value={item.value}>
       {`${item?.value}${item?.value !== item?.label ? ` - ${item?.label}` : ''}`}
      </Select.Option>
     ))}
    </Select>
   </div>
  </div>
 );
};

export default SummaryHeader;
