import { InfoCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import React from 'react';
import BrokerDetails from './BrokerDetails';
// import '../../../../styles/components/mrvStyleDue.scss';

const MRVCoverage = ({
 tableColumn = '',
 tableData = [],
 highlightKey = 'ID',
 heading = '',
 tranId,
}) => {
 const column = tableColumn?.length > 0 ? JSON.parse(tableColumn) : tableColumn;

 return (
  <div className='MRV_card_Coverage grid grid-cols-6 gap-2 pe-2'>
   {tableData?.map((item, index) => (
    <div
     data-id={item?.[highlightKey]}
     key={item?.[highlightKey]}
     className={`col-span-2 ${'list_card'}`}>
     <div className={`action_header flex item-center justify-${'between'}`}>
      <p className='mrv_title_name'>{`${heading} - ${index + 1}`}</p>
      {heading === 'Broker/Agent' && (
       <Popover
        overlayClassName={'broker_details_Popover'}
        content={<BrokerDetails brokerId={item?.ID} code={item['Broker Code']} />}
        trigger='hover'>
        <InfoCircleOutlined className='info-icon' />
       </Popover>
      )}
     </div>

     {Object.keys(column)?.map(key => (
      <div key={key} className='ml-3 mrv_list items-center grid grid-cols-12 mb-1'>
       <p className='col-span-6 key_font'>{column[key]}</p>
       <p className='col-span-6 value_font'>{item[key]}</p>
      </div>
     ))}
    </div>
   ))}
  </div>
 );
};

export default MRVCoverage;
