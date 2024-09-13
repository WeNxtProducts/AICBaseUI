import * as Yup from 'yup';

const paymentValidaionSchema = Yup.object().shape({
 RD_PAY_MODE: Yup.string().required('Payment mode is required'),
 RD_FC_AMT: Yup.number().required('FC Amount is required'),
 //  RD_LC_AMT: Yup.number().required('LC Amount is required'),

 RD_BANK_REF_NO: Yup.string()
  .label()
  .when('RD_PAY_MODE', {
   is: value => value === 'CC' || value === 'AD',
   then: schema => schema.required('Please enter your Bank code'),
   otherwise: schema => schema.optional('Bank code is not required'),
  }),
 RD_CHQ_BANK_CODE: Yup.string()
  .label()
  .when('RD_PAY_MODE', {
   is: value => value === 'CC' || value === 'AD',
   then: schema => schema.required('Please enter your Bank code'),
   otherwise: schema => schema.optional('Bank code is not required'),
  }),

 RD_CHQ_NO: Yup.string()
  .label()
  .when('RD_PAY_MODE', {
   is: 'C',
   then: schema => schema.required('Please enter your Cheque number'),
   otherwise: schema => schema.optional('Cheque number is not required'),
  }),
 RD_CHQ_DT: Yup.string()
  .label()
  .when('RD_PAY_MODE', {
   is: 'C',
   then: schema => schema.required('Please enter your Cheque date'),
   otherwise: schema => schema.optional('Cheque date is not required'),
  }),

 PD_BANK_NAME: Yup.string()
  .label()
  .when('RD_PAY_MODE', {
   is: 'CC',
   then: schema => schema.required('Please enter your bank name'),
   otherwise: schema => schema.optional('bank name is not required'),
  }),
 PD_CC_NO: Yup.string()
  .label()
  .when('RD_PAY_MODE', {
   is: 'CC',
   then: schema =>
    schema.required('Card Number is required').test('len', 'Please enter 16 digits', value => {
     return value && value.length === 16 && /^\d{16}$/.test(value);
    }),
   otherwise: schema => schema.optional('card number is not required'),
  }),
 PD_CVV_NO: Yup.string()
  .label()
  .when('RD_PAY_MODE', {
   is: 'CC',
   then: schema =>
    schema.required('CVV is required').test('len', 'Please enter exactly 3 digits', value => {
     return value && value.length === 3 && /^\d{3}$/.test(value);
    }),
   otherwise: schema => schema.optional('CVV is not required'),
  }),
 PD_CC_EXP_DT: Yup.string()
  .label()
  .when('RD_PAY_MODE', {
   is: 'CC',
   then: schema => schema.required('Please enter Expiry date'),
   otherwise: schema => schema.optional('Expiry date is not required'),
  }),

 RD_CUST_BANK_ACNT_NO: Yup.string()
  .label()
  .when('RD_PAY_MODE', {
   is: 'AD',
   then: schema => schema.required('Please enter Account No'),
   otherwise: schema => schema.optional('Account No is not required'),
  }),
 RD_BANK_IFSC_CODE: Yup.string()
  .label()
  .when('RD_PAY_MODE', {
   is: 'AD',
   then: schema => schema.required('Please enter IFSC Code'),
   otherwise: schema => schema.optional('IFSC Code is not required'),
  }),
 RD_BANK_ACNT_NAME: Yup.string()
  .label()
  .when('RD_PAY_MODE', {
   is: 'AD',
   then: schema => schema.required('Please enter Account Name'),
   otherwise: schema => schema.optional('Account Name is not required'),
  }),
});

export default paymentValidaionSchema;
