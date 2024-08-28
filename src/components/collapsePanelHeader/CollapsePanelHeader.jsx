import { useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import './collapsePanelHeader.scss';
import ErrorLog from '../errorLog/ErrorLog';
import ErrorContent from '../errorLog/ErrorContent';

const CollapsePanelHeader = ({ name, saved, ds_type = 1 }) => {
 return (
  <div className='custom-header-panel flex items-center justify-between select-none'>
   <div>
    <p className='title-style pl-2'>{name}</p>
   </div>
   {/* {saved?.status === 'completed' && (
    <div className='saved-status mr-5'>
     <p>Saved!!!</p>
    </div>
   )} */}
   {ds_type == 1 && (
    <ErrorLog classNamePopOver='error-log-popover' classNameText='error-log-status'>
     <ErrorContent />
    </ErrorLog>
   )}
  </div>
 );
};

export default CollapsePanelHeader;
