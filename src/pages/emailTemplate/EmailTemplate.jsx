import React, { createContext, useState } from 'react';
import EmailTemplateJSON from '../../getFormFields/EMAILTEMPLATE_getFieldList.json';
import EmailTemplateLOVJSON from '../../getFormFields/EMAILTEMPLATE_getLOVList.json';
import { useSelector } from 'react-redux';
import EmailTemplateEntryForm from './emailTemplateEntryForm/EmailTemplateEntryForm';
import EmailTempatePanels from './emailTempatePanels/EmailTempatePanels';
import '../docPrint/DocPrint.scss';

export const MailTemplateContext = createContext();

const EmailTemplate = () => {
 const id = useSelector(state => state?.id?.id);
 const formValues = useSelector(state => state?.id?.formValues);
 const [dropDown, setDropDown] = useState(EmailTemplateLOVJSON);

 const data = {
  EmailTemplateJSON,
  EmailTemplateLOVJSON,
  id,
  formValues,
  dropDown,
  setDropDown,
 };

 return (
  <MailTemplateContext.Provider value={data}>
   <div className='doc_print p-3'>
    <p className='template_header'>Email Template SetUp</p>
    <EmailTemplateEntryForm />
   </div>
   <EmailTempatePanels />
  </MailTemplateContext.Provider>
 );
};

export default EmailTemplate;
