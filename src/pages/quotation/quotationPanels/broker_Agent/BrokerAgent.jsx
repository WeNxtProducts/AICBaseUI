import React, { useContext, useEffect, useState } from 'react';
import { StepperContext } from '../../Quotation';
import {
 CustomDropDown,
 CustomNumberField,
} from '../../../../components/commonExportsFields/CommonExportsFields';
import { FieldArray, Form, Formik, ErrorMessage } from 'formik';
import { brokerValidationSchema } from '../../../../components/commonHelper/SchemaGenerator';
import { DeleteOutlined } from '@ant-design/icons';
import useApiRequests from '../../../../services/useApiRequests';
import showNotification from '../../../../components/notification/Notification';
import Loader from '../../../../components/loader/Loader';

const BrokerAgent = () => {
 const {
  formValues,
  freeze,
  handleNext,
  rules,
  isPremCalc,
  id: tranId,
 } = useContext(StepperContext);
 const getBrokerList = useApiRequests('getBrokerList', 'POST');
 const brokerTypeShared =
  formValues?.frontForm?.formFields?.POL_AGENT_COMM_BASIS?.PFD_FLD_VALUE === 'S';
 const [agentList, setAgentList] = useState([]);
 const [loader, setLoader] = useState(false);
 const [initialValues, setInitialValues] = useState(null);

 const handleGetBrokerList = async () => {
  try {
   const response = await getBrokerList('', { tranId });
   if (response?.status === 'SUCCESS') {
    setInitialValues(response?.Data);
   } else if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 useEffect(() => {
  handleGetBrokerList();
 }, []);

 const onBlurHandler = async (val, label) => {
  const key = val;
  console.log('key : ', key);
 };

 return (
  <div className='broker_agent p-3'>
   {loader && <Loader />}
   {initialValues !== null && (
    <Formik
     initialValues={initialValues}
     validationSchema={brokerValidationSchema}
     onSubmit={values => {
      console.log('Submitted values:', values);
     }}>
     {({ values, setFieldValue, errors }) => {
      return (
       <Form>
        <FieldArray name='polBrokerDetails'>
         {({ push, remove }) => (
          <div className='grid grid-cols-8'>
           {brokerTypeShared && (
            <div className='col-span-6 flex justify-end'>
             <button
              type='button'
              className='add-buttons-broker'
              onClick={() =>
               push({ formFields: { PBRK_BRK_CODE: '', PBRK_BRK_NAME: '', PBRK_BRK_PERC: '' } })
              }>
              <div className='flex items-center'>
               <i className='bi bi-plus icon-style' />
               <p>Add New</p>
              </div>
             </button>
            </div>
           )}
           <div className='col-span-8'>
            {values?.polBrokerDetails?.map((broker, index) => (
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
                  name={`polBrokerDetails.${index}.formFields.PBRK_BRK_CODE`}
                  options={agentList}
                  readOnly={freeze}
                  value={broker?.formFields?.PBRK_BRK_CODE || undefined}
                  onChange={e =>
                   setFieldValue(`polBrokerDetails.${index}.formFields.PBRK_BRK_CODE`, e)
                  }
                  onBlur={(e, label) => onBlurHandler(e, label)}
                  format='codedescsearch'
                 />
                 <ErrorMessage
                  name={`polBrokerDetails.${index}.formFields.PBRK_BRK_CODE`}
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
                  name={`polBrokerDetails.${index}.formFields.PBRK_BRK_PERC`}
                  placeholder='0'
                  format='number'
                  size='small'
                  readOnly={freeze}
                  value={broker?.formFields?.PBRK_BRK_PERC}
                  onChange={e => {
                   setFieldValue(
                    `polBrokerDetails.${index}.formFields.PBRK_BRK_PERC`,
                    e.target.value,
                   );
                  }}
                 />
                 <ErrorMessage
                  name={`polBrokerDetails.${index}.formFields.PBRK_BRK_PERC`}
                  component='div'
                  className='error-message'
                 />
                 {brokerTypeShared && (
                  <div className='ml-5'>
                   <button type='button' onClick={() => remove(index)}>
                    <DeleteOutlined className='delete-button' />
                   </button>
                  </div>
                 )}
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
         {brokerTypeShared && (
          <button disabled={freeze} type='submit' className='save me-5'>
           Submit
          </button>
         )}

         <button type='button' onClick={() => handleNext()} className='next-btn ml-5'>
          Next
         </button>
        </div>
       </Form>
      );
     }}
    </Formik>
   )}
  </div>
 );
};

export default BrokerAgent;
