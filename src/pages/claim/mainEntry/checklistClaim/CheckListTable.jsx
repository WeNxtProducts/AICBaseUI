import React from 'react';
import { Button } from 'antd';
import {
 checklistColumn,
 checklistData,
} from '../../../../components/tableComponents/sampleData';
import ModernTable from '../../../../components/modernTable/ModernTable';
import { TextInputWithSearchIcon } from '../../../../components/commonExportsFields/CommonExportsFields';

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
