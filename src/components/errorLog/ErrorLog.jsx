import React from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import ErrorContent from './ErrorContent';
import './ErrorLog.scss';

const ErrorLog = ({
 children,
 classNamePopOver = 'error-log-popover',
 classNameText = 'error-log-status',
 tagName = 'Error',
}) => {
 return (
  <div className={`${classNameText} flex mr-5`}>
   <p>
    {tagName}
    <Popover
     overlayClassName={classNamePopOver}
     content={children}
     //  open={true}
     trigger='hover'>
     <InfoCircleOutlined className='info-icon' />
    </Popover>
   </p>
  </div>
 );
};

export default ErrorLog;
