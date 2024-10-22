import dayjs from 'dayjs';
import * as Yup from 'yup';

export const medicalFeeFormSchema = () => {
 return Yup.object().shape({
  medicalFee: Yup.object().shape({
   formFields: Yup.object().shape({
    pay_to: Yup.string().required('Pay to is required'),
    clinic_code: Yup.string().required('Clinic is required'),
    pol_from_date: Yup.string().required('From Date is required'),
    pol_end_date: Yup.string()
     .required('End Date is required')
     .test('is-greater', 'End date cannot be earlier than start date', function (value) {
      const { pol_from_date } = this.parent;
      return !pol_from_date || !value || new Date(value) >= new Date(pol_from_date);
     }),
   }),
  }),
 });
};
