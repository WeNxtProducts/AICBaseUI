import React, { useContext, useState } from 'react';
import { Button } from 'antd';
import CheckListDocuments from './checkListDocuments/CheckListDocuments';
import { UWContext } from '../UnderWriterWorkBench';

const ActionButtons = () => {
 const { tranId, policyNumber, navigateToQuotation } = useContext(UWContext);
 const [checkListOpen, setCheckListOpen] = useState(false);

 const handleClose = () => {
  setCheckListOpen(false);
 };

 return (
  <div className='action-buttons'>
   <div className='flex flex-col items-center'>
    <Button onClick={() => setCheckListOpen(true)}>View Checklist</Button>
    <Button
     onClick={() => {
      navigateToQuotation();
     }}>
     Edit
    </Button>
   </div>
   {checkListOpen && (
    <CheckListDocuments
     open={checkListOpen}
     handleClose={handleClose}
     tranId={tranId}
     proposalNumber={policyNumber}
     freeze={true}
    />
   )}
  </div>
 );
};

export default ActionButtons;
