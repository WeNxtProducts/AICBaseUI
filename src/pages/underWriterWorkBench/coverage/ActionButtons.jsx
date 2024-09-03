import React, { useContext, useState } from 'react';
import { Button } from 'antd';
import CheckListDocuments from './checkListDocuments/CheckListDocuments';
import { UWContext } from '../UnderWriterWorkBench';
import { useDispatch } from 'react-redux';
import { setCurrentID } from '../../../globalStore/slices/IdSlices';
import { useNavigate } from 'react-router-dom';

const ActionButtons = () => {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 const { tranId, policyNumber } = useContext(UWContext);
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
      dispatch(setCurrentID(tranId));
      navigate(`/quotation/${'6'}`);
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
