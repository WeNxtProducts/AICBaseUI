import React, { useState } from 'react';
import { debounce } from 'lodash';
import { Button, Radio } from 'antd';
import { CustomSelect } from '../../../components/commonExportsFields/CommonExportsFields';
import { currCode } from '../../../components/tableComponents/sampleData';
import useApiRequests from './../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';

const serchMethods = [
 { value: 207, label: 'Customer Code ', rKey: 'C' },
 { value: 210, label: 'Loan No', rKey: 'L' },
 { value: 208, label: 'Policy No', rKey: 'PO' },
 { value: 209, label: 'Proposal No', rKey: 'PR' },
];

const CaptureFields = () => {
 const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
 const receiptSave = useApiRequests('receiptSave', 'POST');
 const getParamLov = useApiRequests('getParamLov', 'GET');
 const [loader, setLoader] = useState(false);
 const [values, setValues] = useState({
  receiptHeader: {
   formFields: {
    RH_CURR_CODE: '',
    RH_REP_RCPT_REF_NO: '',
    RH_RCPT_BAS: 'C',
   },
  },
 });
 const [dropdown, setDropdown] = useState([]);
 const [selectedSearch, setSelectedSearch] = useState(207);

 const handleSearchMethodChange = e => {
  setSelectedSearch(e.target.value);
  handleValueChange(
   findLabelByValue(e.target.value, 'rKey'),
   'RH_RCPT_BAS',
   'RH_REP_RCPT_REF_NO',
   '',
  );
  setDropdown([]);
 };

 const findLabelByValue = (value, key = 'label') => {
  const method = serchMethods?.find(method => method.value === value);
  return method ? method[key] : 'Label not found';
 };

 const onHandleSearch = debounce(async val => {
  if (val?.length > 0) {
   try {
    const response = await getParamLov('', {
     queryId: selectedSearch,
     searchTerm: val,
    });
    if (response?.status === 'FAILURE') {
     showNotification.ERROR(response?.status_msg);
    } else if (response?.status === 'SUCCESS') {
     setDropdown(response?.Data[findLabelByValue(selectedSearch)]);
    }
   } catch (err) {
    console.error(err);
   }
  }
 }, 200);

 const procedureCall = async (id, msg) => {
  const payload = { inParams: { P_RH_TRAN_ID: id } };
  try {
   const response = await invokeClaimsProcedure(payload, {
    procedureName: 'P_POPULATE_ELIGIBLE_RCPT',
   });
   if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
   } else if (response?.status === 'SUCCESS') {
    showNotification.SUCCESS(msg);
   }
   setLoader(false);
  } catch (err) {
   setLoader(false);
  }
 };

 const onSubmit = async () => {
  const { RH_CURR_CODE, RH_REP_RCPT_REF_NO, RH_RCPT_BAS } = values.receiptHeader.formFields;
  if (!RH_CURR_CODE && !RH_REP_RCPT_REF_NO) {
   showNotification.WARNING('All fields must be filled.');
   return;
  }

  if (!RH_REP_RCPT_REF_NO) {
   showNotification.WARNING(`${findLabelByValue(selectedSearch)}  is required.`);
   return;
  }
  if (!RH_CURR_CODE) {
   showNotification.WARNING('Currency Code is required.');
   return;
  }

  try {
   setLoader(true);
   const response = await receiptSave(values);
   if (response?.status === 'FAILURE') {
    showNotification.ERROR(response?.status_msg);
    setLoader(false);
   } else if (response?.status === 'SUCCESS') {
    showNotification.SUCCESS(response?.status_msg);
    console.log('response : ', response?.Data?.Id, response?.status_msg);
    procedureCall(response?.Data?.Id, response?.status_msg);
   }
  } catch (err) {
   setLoader(false);
  }
 };

 const handleValueChange = (val, key, key2, val2) => {
  setValues(prevValues => ({
   ...prevValues,
   receiptHeader: {
    ...prevValues.receiptHeader,
    formFields: {
     ...prevValues.receiptHeader.formFields,
     [key]: val,
     ...(!val2 && { [key2]: val2 }),
    },
   },
  }));
 };

 return (
  <div className='cap_fields mt-5'>
   <div className='col-span-10'>
    <Radio.Group
     value={selectedSearch}
     buttonStyle='solid'
     size='medium'
     onChange={handleSearchMethodChange}>
     {serchMethods.map(method => (
      <Radio.Button key={method.value} value={method.value}>
       {method.label}
      </Radio.Button>
     ))}
    </Radio.Group>
   </div>
   <div className='col-span-4'>
    <p className='field_label'>{findLabelByValue(selectedSearch)}</p>
    <CustomSelect
     name={`customer_code`}
     options={dropdown || []}
     showSearch={true}
     onSearch={e => {
      onHandleSearch(e);
     }}
     searchMsg={`Search ${findLabelByValue(selectedSearch)}`}
     placeholder={`${findLabelByValue(selectedSearch)}`}
     size='large'
     value={values?.receiptHeader?.formFields?.RH_REP_RCPT_REF_NO || undefined}
     onChange={e => {
      handleValueChange(e, 'RH_REP_RCPT_REF_NO');
     }}
    />
   </div>
   <div className='col-span-4'>
    <p className='field_label'>Currency Code</p>
    <CustomSelect
     options={currCode}
     name={`currency`}
     showSearch={false}
     placeholder={'select'}
     value={values?.receiptHeader?.formFields?.RH_CURR_CODE || undefined}
     onChange={e => {
      handleValueChange(e, 'RH_CURR_CODE');
     }}
    />
   </div>
   <div className='col-span-4'>
    <Button className='fetch_btn' onClick={() => onSubmit()}>
     Fetch
    </Button>
   </div>
  </div>
 );
};

export default CaptureFields;
