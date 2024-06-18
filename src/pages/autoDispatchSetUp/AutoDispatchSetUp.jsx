import React, { createContext, useState } from 'react';
import AutoDispatchJSON from '../../getFormFields/AUTODISPATCH_getFieldList.json';
import AutoDispatchLOVJSON from '../../getFormFields/AUTODISPATCH_getLOVList.json';
import { useSelector } from 'react-redux';
import AutoDispatchEntryForm from './autoDispatchEntryForm/AutoDispatchEntryForm';
import './AutoDispatchSetUp.scss';

export const AutoDispatchContext = createContext();

const AutoDispatchSetUp = () => {
 const id = useSelector(state => state?.id?.id);
 const formValues = useSelector(state => state?.id?.formValues);
 const [dropDown, setDropDown] = useState(AutoDispatchLOVJSON);

 const data = {
  AutoDispatchJSON,
  AutoDispatchLOVJSON,
  id,
  formValues,
  dropDown,
  setDropDown,
 };

 return (
  <AutoDispatchContext.Provider value={data}>
   <div className='auto_dispatch_setup p-3'>
    <p className='template_header'>Auto Dispatch SetUp</p>
    <AutoDispatchEntryForm />
   </div>
  </AutoDispatchContext.Provider>
 );
};

export default AutoDispatchSetUp;
