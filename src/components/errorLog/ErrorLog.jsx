import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import ErrorContent from './ErrorContent';
import './ErrorLog.scss';

const ErrorLog = ({ name }) => {
 return (
  <div className='error-log-status flex mr-5'>
   <p>
    Error
    <Popover
     overlayClassName='error-log-popover'
     content={<ErrorContent name={name} />}
     //  open={true}
     trigger='hover'>
     <InfoCircleOutlined className='info-icon' />
    </Popover>
   </p>
  </div>
 );
};

export default ErrorLog;
