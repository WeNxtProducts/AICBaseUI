import { Checkbox, Select } from 'antd';
import { notification_options } from '../../../components/tableComponents/sampleData';
import { PrinterOutlined } from '@ant-design/icons';

const ClaimDetails = () => {
 return (
  <div className='claim_header p-2 py-3 pe-5'>
   <div className='claim_no'>
    <p>Claim No</p>
    <p>C/2981/0192/090/090</p>
   </div>
   <div className='summary_header'>
    <div className='flex items-center gap-1'>
     <div className='check_box_label'>Process Y/N</div>
     <div>
      <Checkbox />
     </div>
    </div>
    <div className='flex items-center gap-1'>
     <div className='check_box_label'>Reject Y/N</div>
     <div>
      <Checkbox />
     </div>
    </div>
    <div className='flex items-center'>
     <div className='check_box_label_select'>Reason to reject</div>
     <Select className='reason_select_box' placeholder='Reason'>
      {notification_options?.map(item => (
       <Select.Option key={item.value} value={item.value}>
        {`${item?.value}${
         item?.value !== item?.label ? ` - ${item?.label}` : ''
        }`}
       </Select.Option>
      ))}
     </Select>
    </div>
    <div className='print_Setup'>
     <span className='printer_font'>Print</span>
     <PrinterOutlined className='printer_icon' />
    </div>
   </div>
  </div>
 );
};

export default ClaimDetails;
