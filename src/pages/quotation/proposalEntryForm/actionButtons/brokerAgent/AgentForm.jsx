import React, { useContext, useState } from 'react';
import { StepperContext } from '../../../Quotation';
import MainForm from '../../../../../components/mainForm/MainForm';

const AgentForm = () => {
 const { QuotationJSON } = useContext(StepperContext);
 const [agentDetails, setAgentDetails] = useState(QuotationJSON);
 const [agentInitialValues, setAgentInitialValues] = useState(QuotationJSON);

 const onSubmit = values => {
  console.log('values : ', values);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };
 return (
  <div>
   <MainForm
    initialValues={agentInitialValues}
    formRender={agentDetails}
    root='agent_form'
    onSubmit={onSubmit}
    handleChangeValue={handleChangeValue}
    grid='1'
   />
  </div>
 );
};

export default AgentForm;
