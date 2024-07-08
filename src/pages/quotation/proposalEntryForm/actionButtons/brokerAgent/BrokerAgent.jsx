import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'antd';
import AgentForm from './AgentForm';
import AgentCommission from './AgentCommission';
import CustomList from '../../../../../components/customList/CustomList';

const BrokerAgent = ({ open, handleClose }) => {
 const [Open, setOpen] = useState(false);

 useEffect(() => {
  setOpen(open);
 }, []);

 const onClose = () => {
  setOpen(false);
  handleClose();
 };

 return (
  <Modal width={1000} open={Open} onCancel={() => onClose()} footer={null}>
   <div className='broker_agent'>
    <div className='header grid grid-cols-12'>
     <div className='col-span-7 flex items-center justify-between'>
      <p>Agent/Broker Details</p>
      <Button className='mr-4'>
       <div>
        <i class='bi bi-plus mr-1' /> Add New
       </div>
      </Button>
     </div>
    </div>

    <div className='grid grid-cols-12 mt-4 gap-5'>
     <div className='agent_form col-span-7'>
      <AgentForm />
     </div>
     <div className='agent_commission col-span-5'>
      <AgentCommission />
     </div>
    </div>
    <div className='mb-1 mt-4 col-span-8'>
     <CustomList />
    </div>
   </div>
  </Modal>
 );
};

export default BrokerAgent;
