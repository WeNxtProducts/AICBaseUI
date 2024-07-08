import React, { useContext, useState } from 'react';
import { Button } from 'antd';
import Address from './address/Address';
import BankDetails from './bankDetails/BankDetails';
import { StepperContext } from '../../Quotation';
import PremCalc from './premCalc/PremCalc';
import BrokerAgent from './brokerAgent/BrokerAgent';

const ActionButtons = () => {
 const { setShowUnderWriter } = useContext(StepperContext);
 const [addressOpen, setAddressOpen] = useState(false);
 const [bankDetailsOpen, setBankDetailsOpen] = useState(false);
 const [premCalcOpen, setPremCalcOpen] = useState(false);
 const [brokerOpen, setBrokerOpen] = useState(false);

 const handleClose = () => {
  setAddressOpen(false);
  setBankDetailsOpen(false);
  setPremCalcOpen(false);
  setBrokerOpen(false);
 };

 return (
  <div className='action-buttons'>
   <div className='section-1 flex flex-col items-center'>
    <Button>Customer</Button>
    <Button>Assured</Button>
    <Button>File Upload</Button>
    <Button>DMS</Button>
   </div>
   <div className='section-2 mt-7 flex flex-col items-center'>
    <Button onClick={() => setBrokerOpen(true)}>Broker/Agent</Button>
    <Button onClick={() => setAddressOpen(true)}>Address</Button>
    <Button onClick={() => setBankDetailsOpen(true)}>Bank Dtls</Button>
    <Button>Approval</Button>
    <Button>Copy</Button>
    <Button>Bus Rule</Button>
    <Button onClick={() => setShowUnderWriter(true)}>UW Decision</Button>
    <Button>Convert</Button>
    <Button>Claim</Button>
    <Button onClick={() => setPremCalcOpen(true)}>Prem Calc</Button>
   </div>
   {addressOpen && <Address open={addressOpen} handleClose={handleClose} />}
   {bankDetailsOpen && (
    <BankDetails open={bankDetailsOpen} handleClose={handleClose} />
   )}
   {premCalcOpen && <PremCalc open={premCalcOpen} handleClose={handleClose} />}
   {brokerOpen && <BrokerAgent open={brokerOpen} handleClose={handleClose} />}
  </div>
 );
};

export default ActionButtons;
