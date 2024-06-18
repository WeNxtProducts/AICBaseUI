import React, { createContext, useState } from 'react';
import DoctPrintJSON from '../../getFormFields/DOCPRINTSETUP_getFieldList.json';
import DocPrintLOVJSON from '../../getFormFields/DOCPRINTSETUP_getLOVList.json';
import { useSelector } from 'react-redux';
import DocPrintEntryForm from './docPrintEntryForm/DocPrintEntryForm';
import DocPrintPanels from './docPrintPanels/DocPrintPanels';
import './DocPrint.scss';

export const DocPrintContext = createContext();

const DocPrint = () => {
 const id = useSelector(state => state?.id?.id);
 const formValues = useSelector(state => state?.id?.formValues);
 const [dropDown, setDropDown] = useState(DocPrintLOVJSON);

 const data = {
  DoctPrintJSON,
  DocPrintLOVJSON,
  id,
  formValues,
  dropDown,
  setDropDown,
 };

 return (
  <DocPrintContext.Provider value={data}>
   <div className='doc_print p-3'>
    <p className='template_header'>Doc Print SetUp</p>
    <DocPrintEntryForm />
   </div>
   <DocPrintPanels />
  </DocPrintContext.Provider>
 );
};

export default DocPrint;
