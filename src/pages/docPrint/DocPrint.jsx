import React, { createContext, useState } from 'react';
import DoctPrintJSON from '../../getFormFields/DOCPRINTSETUP_getFieldList.json';
import DocPrintLOVJSON from '../../getFormFields/DOCPRINTSETUP_getLOVList.json';
import { useSelector } from 'react-redux';
import DocPrintEntryForm from './docPrintEntryForm/DocPrintEntryForm';
import DocPrintPanels from './docPrintPanels/DocPrintPanels';
import './DocPrint.scss';
import { Tab, Tabs } from '../../components/customTabs/Tabs';

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

 const [activeTab, setActiveTab] = useState(0);

 const handleTabClick = index => {
  setActiveTab(index);
 };

 return (
  <DocPrintContext.Provider value={data}>
   <div className='doc_print p-3'>
    <p className='template_header'>Doc Print SetUp</p>
    <DocPrintEntryForm />
   </div>
   <DocPrintPanels />

   {/* <Tabs activeTab={activeTab} onTabClick={handleTabClick}>
    <Tab label='Tab 1'>
     <div>Content for Tab 1</div>
    </Tab>
    <Tab label='Tab 2'>
     <div>Content for Tab 2</div>
    </Tab>
    <Tab label='Tab 3'>
     <div>Content for Tab 3</div>
    </Tab>
   </Tabs> */}
  </DocPrintContext.Provider>
 );
};

export default DocPrint;
