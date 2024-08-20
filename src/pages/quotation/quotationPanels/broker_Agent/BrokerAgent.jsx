import React, { useContext, useState } from 'react';
import { Button } from 'antd';
import { StepperContext } from '../../Quotation';
import {
 CustomDropDown,
 CustomNumberField,
} from '../../../../components/commonExportsFields/CommonExportsFields';
import { FieldArray, Form, Formik, ErrorMessage } from 'formik';
import { brokerValidationSchema } from '../../../../components/commonHelper/SchemaGenerator';
import * as Yup from 'yup';
import { DeleteOutlined } from '@ant-design/icons';

const BrokerAgent = () => {
 const { formValues, freeze, handleNext, rules, isPremCalc } = useContext(StepperContext);
 const [agentList, setAgentList] = useState([]);
 const [initialValues, setInitialValues] = useState({
  brokerList: [
   {
    id: 1,
    broker_code: '',
    broker_name: '',
    percentage: '',
   },
  ],
 });

 const onBlurHandler = async (val, label) => {
  const key = val;
  console.log('key : ', key);
 };

 return (
  <div className='broker_agent p-3'>
   <Formik
    initialValues={initialValues}
    validationSchema={Yup.object({ brokerList: brokerValidationSchema })}
    onSubmit={values => {
     console.log('Submitted values:', values);
    }}>
    {({ values, setFieldValue }) => (
     <Form>
      <FieldArray name='brokerList'>
       {({ push, remove }) => (
        <div className='grid grid-cols-8'>
         <div className='col-span-6 flex justify-end'>
          <button
           type='button'
           className='add-buttons-broker'
           onClick={() => push({ id: -1, broker_code: '', broker_name: '', percentage: '' })}>
           <div className='flex items-center'>
            <i className='bi bi-plus icon-style' />
            <p>Add New</p>
           </div>
          </button>
         </div>
         <div className='col-span-8'>
          {values?.brokerList?.map((broker, index) => (
           <div className='grid grid-cols-2 gap-x-7 mt-3' key={index}>
            <div className='col-span-1'>
             <div className='flex items-center'>
              <div className='w-2/12'>
               <p className='label-font select-none'>
                Agent Code <span className='mandatory-symbol'>*</span>
               </p>
              </div>
              <div className='w-8/12 fields-error'>
               <CustomDropDown
                name={`brokerList.${index}.broker_code`}
                options={agentList}
                readOnly={freeze}
                value={broker.broker_code || undefined}
                onChange={e => setFieldValue(`brokerList.${index}.broker_code`, e)}
                onBlur={(e, label) => onBlurHandler(e, label)}
                format='codedescsearch'
               />
               <ErrorMessage
                name={`brokerList.${index}.broker_code`}
                component='div'
                className='error-message'
               />
              </div>
             </div>
            </div>

            <div className='col-span-1'>
             <div className='flex items-center'>
              <div className='w-2/12'>
               <p className='label-font select-none'>
                Percentage <span className='mandatory-symbol'>*</span>
               </p>
              </div>
              <div className='w-8/12 fields-error flex items-center'>
               <CustomNumberField
                name={`brokerList.${index}.percentage`}
                placeholder='0'
                format='number'
                size='small'
                readOnly={freeze}
                value={broker?.percentage}
                onChange={e => {
                 setFieldValue(`brokerList.${index}.percentage`, e.target.value);
                }}
               />
               <ErrorMessage
                name={`brokerList.${index}.percentage`}
                component='div'
                className='error-message'
               />
               <div className='ml-5'>
                <button type='button' onClick={() => remove(index)}>
                 <DeleteOutlined className='delete-button' />
                </button>
               </div>
              </div>
             </div>
            </div>
           </div>
          ))}
         </div>
        </div>
       )}
      </FieldArray>
      <div className='col-span-6 flex justify-center w-full mt-5 mb-3 broker-submit-button-form'>
       <button disabled={freeze} type='submit' className='save me-5'>
        Submit
       </button>

       <button type='button' onClick={() => handleNext()} className='next-btn ml-5'>
        Next
       </button>
      </div>
     </Form>
    )}
   </Formik>
   {/* <Button onClick={() => handleNext()}>Next</Button> */}
  </div>
 );
};

export default BrokerAgent;
