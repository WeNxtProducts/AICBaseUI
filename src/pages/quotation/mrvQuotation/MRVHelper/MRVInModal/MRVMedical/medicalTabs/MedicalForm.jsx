import React, { useContext, useEffect, useState } from 'react';
import MRVQuotationForm from '../../../MRVQuotationForm';
import {
 deepCopy,
 extractFieldValuesInPlace,
} from '../../../../../../../components/commonHelper/DataSend';
import { StepperContext } from '../../../../../Quotation';
import { getQueryId } from '../../../../../../../components/commonHelper/QueryIdFetch';
import { sortObjectByPFDSeqNo } from '../../../../../../../components/commonHelper/SortBySequence';

const MedicalForm = ({ root, tranId }) => {
 const { QuotationJSON } = useContext(StepperContext);
 const [quotationMRV, setQuotationMRV] = useState(null);
 const [quotationMRVInitialValues, setQuotationMRVInitialValues] =
  useState(null);

 const onSubmit = values => {
  const val = deepCopy(values);
  const modifiedData = extractFieldValuesInPlace(val);
 };

 const handleChangeValue = (value, path, setFieldValue, values) => {
  setFieldValue(path, value);
 };

 const handleInitData = response => {
  const orderedData = sortObjectByPFDSeqNo(response);
  setQuotationMRV({ [root]: orderedData[root] });
  setQuotationMRVInitialValues({ [root]: orderedData[root] });
 };

 useEffect(() => {
  if (tranId) {
   handleInitData(QuotationJSON);
  } else {
   handleInitData(QuotationJSON);
  }
 }, [tranId]);

 return (
  <div className='mt-3'>
   {quotationMRV &&
    Object.prototype.hasOwnProperty.call(quotationMRV, root) && (
     <MRVQuotationForm
      initialValues={quotationMRVInitialValues}
      formRender={quotationMRV}
      root={root}
      lovList={[]}
      onSubmit={onSubmit}
      handleChangeValue={handleChangeValue}
      smallFont={true}
     />
    )}
  </div>
 );
};

export default MedicalForm;
