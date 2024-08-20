import { useEffect } from 'react';
import { InfoCircleOutlined } from '@ant-design/icons';
import './collapsePanelHeader.scss';
import ErrorLog from '../errorLog/ErrorLog';

const CollapsePanelHeader = ({ name, saved }) => {
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
   <ErrorLog name={name} />
  </div>
 );
};

export default CollapsePanelHeader;
