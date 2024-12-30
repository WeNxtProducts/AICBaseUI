/* eslint-disable react-hooks/rules-of-hooks */
import React, { useMemo, useState } from 'react';
import {
 emailData,
 module_type_options,
 notification_options,
} from '../../components/tableComponents/sampleData';
import { Form, Formik } from 'formik';
import { Checkbox } from 'antd';
import {
 CustomDatePicker,
 CustomDropDown,
 CustomSelect,
 CustomTextArea,
} from '../../components/commonExportsFields/CommonExportsFields';
import MailCheckListing from './mailCheckListing/MailCheckListing';
import MessageValue from './mailCheckListing/MessageValue';
import HtmlEditor from './mailCheckListing/HtmlEditor';
import MailMessageEditor from './mailCheckListing/MailMessageEditor';
import './EmailSetUp.scss';

const EmailSetUp = () => {
 const [initialValues, setInitialValues] = useState(emailData);
 const [selectedValue, setSelectedValue] = useState('');

 const onSubmit = values => {
  console.log('EmailSetUp : ', values);
 };

 const onChange = checkedValues => {
  console.log('checked = ', checkedValues);
 };

 return (
  <div className='email_setup p-2'>
   <p className='template_header'>Email Template</p>
   <div className='mt-4'>
    <Formik
     initialValues={initialValues}
     values={initialValues}
     onSubmit={onSubmit}
     enableReinitialize={true}>
     {({ handleSubmit, values, setFieldValue }) => {
      return (
       <Form onSubmit={handleSubmit}>
        <div className='current-field p-2 flex items-center select-none '>
         <div className='w-1/5'>
          <p className='label-font select-none  '>
           Notification Type <span className='mandatory-symbol'>*</span>
          </p>
         </div>
         <div className='input-container flex fields-error w-3/4 pl-3 '>
          {notification_options?.map(item => (
           <div key={item.value} className='ml-2'>
            <Checkbox
             onChange={e => {
              setFieldValue('not_type', e.target.value);
             }}
             checked={item.value == values?.not_type}
             value={item.value}>
             {item.label}
            </Checkbox>
           </div>
          ))}
         </div>
        </div>

        <div className='current-field p-2 flex items-center select-none'>
         <div className='w-1/5'>
          <p className='label-font select-none  '>
           Module Name <span className='mandatory-symbol'>*</span>
          </p>
         </div>
         <div className='input-container flex fields-error w-3/4 pl-3 '>
          {module_type_options?.map(item => (
           <div key={item.value} className='ml-2'>
            <Checkbox
             onChange={e => {
              setFieldValue('module_name', e.target.value);
             }}
             checked={item.value == values?.module_name}
             value={item.value}>
             {item.label}
            </Checkbox>
           </div>
          ))}
         </div>
        </div>

        <div className='current-field p-2 flex items-center select-none '>
         <div className='w-1/5'>
          <p className='label-font select-none  '>
           Template Type <span className='mandatory-symbol'>*</span>
          </p>
         </div>
         <div className='input-container flex fields-error w-3/4 pl-3 '>
          <CustomSelect
           options={module_type_options}
           name={`template_type`}
           placeholder={'select'}
           size='small'
           showSearch={true}
           value={values?.template_type || undefined}
           onChange={e => {
            setFieldValue('template_type', e);
           }}
          />
         </div>
        </div>

        <div className='current-field p-2 flex items-center select-none '>
         <div className='w-1/5'>
          <p className='label-font select-none  '>
           Product Code <span className='mandatory-symbol'>*</span>
          </p>
         </div>
         <div className='input-container flex fields-error w-3/4 pl-3 '>
          <CustomDropDown
           name={`product_code`}
           size='small'
           options={module_type_options}
           value={values?.product_code || undefined}
           onChange={e => {
            setFieldValue('product_code', e);
           }}
          />
         </div>
        </div>

        <div className='current-field p-2 flex items-start select-none '>
         <div className='w-1/5'>
          <p className='label-font select-none  '>
           Subject <span className='mandatory-symbol'>*</span>
          </p>
         </div>
         <div className='input-container flex fields-error w-3/4 pl-3 '>
          <CustomTextArea
           value={values?.subject}
           size='medium'
           placeholder={'subject'}
           onChange={e => {
            setFieldValue('subject', e.target.value);
           }}
          />
         </div>
        </div>

        <div className='grid grid-cols-8'>
         <div className='col-span-4 current-field p-2 flex items-center select-none'>
          <div className='w-1/2'>
           <p className='label-font select-none  '>Effective From</p>
          </div>
          <div className='input-container flex fields-error w-3/4 pl-3 '>
           <CustomDatePicker
            name={`eff_from`}
            placeholder={'date'}
            size='medium'
            value={values?.eff_from}
            onChange={date => {
             setFieldValue('eff_from', date);
            }}
           />
          </div>
         </div>
         <div className='col-span-4 current-field p-2 flex items-center select-none'>
          <div className='w-1/5'>
           <p className='label-font select-none  '>Effective To</p>
          </div>
          <div className='input-container flex fields-error w-3/5 pl-3 '>
           <CustomDatePicker
            name={`eff_to`}
            placeholder={'date'}
            size='medium'
            value={values?.eff_to}
            onChange={date => {
             setFieldValue('eff_to', date);
            }}
           />
          </div>
         </div>
        </div>

        <div className='grid grid-cols-8'>
         <div className='col-span-4 current-field p-2 flex items-start select-none'>
          <div className='w-1/2'>
           <p className='label-font select-none'>
            Mail To <span className='mandatory-symbol'>*</span>
           </p>
          </div>
          <div className='input-container flex fields-error w-3/4 pl-3'>
           <MailCheckListing />
          </div>
         </div>
         <div className='col-span-4 current-field p-2 flex items-start select-none'>
          <div className='w-1/5'>
           <p className='label-font select-none'>Mail CC</p>
          </div>
          <div className='input-container flex fields-error w-3/5 pl-3'>
           <MailCheckListing />
          </div>
         </div>
        </div>

        <div className='grid grid-cols-11 mt-2'>
         <div className='col-span-11'>
          <p className='label-font select-none pl-1'>
           Message Body <span className='mandatory-symbol'>*</span>
          </p>
         </div>
         <div className='col-span-2 mt-2'>
          <MessageValue
           onSelectValue={val => {
            setSelectedValue(val);
            console.log('onSelectValue : ', val);
           }}
          />
         </div>
         <div className='col-span-8 mt-2 ml-8'>
          {useMemo(
           () => (
            <HtmlEditor selectedValue={selectedValue} setSelectedValue={setSelectedValue} />
           ),
           [selectedValue],
          )}
         </div>
         {/* <MailMessageEditor /> */}
        </div>
       </Form>
      );
     }}
    </Formik>
   </div>
  </div>
 );
};

export default EmailSetUp;
