import React from 'react';
import ModernTable from '../../../../components/modernTable/ModernTable';
import { Button } from 'antd';
import { TextInputWithSearchIcon } from '../../../../components/commonExportsFields/CommonExportsFields';
import {
 checklistColumn,
 checklistData,
} from '../../../../components/tableComponents/sampleData';

const CheckListTable = () => {
 return (
  <div className='checklist-table'>
   <div className='flex items-center'>
    <Button
     className='filter-button'
     type='primary'
     icon={<i className='bi bi-funnel-fill' />}>
     Filter
    </Button>
    <div className='w-ful text-search'>
     <TextInputWithSearchIcon
      placeholder='Search'
      //onChange={handleInputChange}
     />
    </div>
   </div>
   <div className='mt-2'>
    <ModernTable tableColumn={checklistColumn} tableData={checklistData} />
   </div>
  </div>
 );
};

export default CheckListTable;
