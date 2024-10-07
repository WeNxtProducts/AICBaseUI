import dayjs from 'dayjs';
import * as Yup from 'yup';

export const createYupSchema = data => {
 if (typeof data === 'object' && !Array.isArray(data)) {
  let schema = {};
  for (const key in data) {
   const fieldValue = data[key];
   if (fieldValue?.formFields) {
    let formFieldsSchema = {};
    for (const formField in fieldValue.formFields) {
     if (
      fieldValue.formFields[formField].PFD_MANDATORY_YN &&
      !fieldValue.formFields[formField].PFD_HIDE_YN
     ) {
      formFieldsSchema[formField] = Yup.object({
       PFD_FLD_VALUE: Yup.string().required(
        `${fieldValue.formFields[formField].PFD_FLD_NAME} is required`,
       ),
      });
     }
    }
    schema[key] = Yup.object().shape({
     formFields: Yup.object().shape(formFieldsSchema),
    });
   } else {
    schema[key] = createYupSchema(fieldValue);
   }
  }
  return Yup.object().shape(schema);
 }

 if (Array.isArray(data)) {
  const itemSchema = createYupSchema(data[0]);
  return Yup.array().of(itemSchema);
 }

 return Yup.string().required('PFD_FLD_VALUE is required');
};

export const generateValidationSchema = data => {
 const { formFields: fields } = data;
 let schemaFields = {};
 for (let fieldName in fields) {
  const field = fields[fieldName];
  if (field.PFD_MANDATORY_YN) {
   schemaFields[fieldName] = Yup.object({
    PFD_FLD_VALUE: Yup.string().required(`${field?.PFD_FLD_NAME} is required`),
   });
  }
 }

 return Yup.object().shape({
  formFields: Yup.object().shape(schemaFields),
 });
};

export const generateMRVValidationSchema = formFields => {
 const validation = {};
 for (let field in formFields) {
  let fieldValidation = Yup.string();
  if (formFields[field].PFD_MANDATORY_YN) {
   fieldValidation = fieldValidation.required(`${formFields[field]?.PFD_FLD_NAME} is required`);
  }
  validation[field] = fieldValidation;
 }
 return Yup.object().shape(validation);
};

const formFieldsSchema = Yup.object().shape({
 PBRK_BRK_CODE: Yup.string().required('Agent Code is required'),
 PBRK_BRK_PERC: Yup.number()
  .required('Percentage is required')
  .min(0, 'Percentage must be at least 0')
  .max(100, 'Percentage cannot exceed 100'),
});

const brokerDetailSchema = Yup.object().shape({
 formFields: formFieldsSchema,
});

export const brokerValidationSchema = Yup.object().shape({
 polBrokerDetails: Yup.array().of(brokerDetailSchema),
});

// formFieldsSchema.validate(data.formFields)
//   .then(valid => console.log("Valid"))
//   .catch(err => console.error(err));

// const validationSchema = Yup.object().shape({
//  claim_type: Yup.string()
//   .oneOf(['death', 'anotherClaimType'])
//   .required('Claim type is required'),
//  claim_based: Yup.string()
//   .oneOf(['preclaimNo', 'nationalID', 'policyNo'])
//   .required('Claim based is required'),
//  preclaimNo: Yup.string().when('claim_based', {
//   is: 'preclaimNo',
//   then: Yup.string().required('Claim number is required'),
//   otherwise: Yup.string().notRequired(),
//  }),
//  nationalID: Yup.string().when('claim_based', {
//   is: 'nationalID',
//   then: Yup.string().required('National ID is required'),
//   otherwise: Yup.string().notRequired(),
//  }),
//  policyNo: Yup.string().when('claim_based', {
//   is: 'policyNo',
//   then: Yup.string().required('Policy number is required'),
//   otherwise: Yup.string().notRequired(),
//  }),
//  reference_no: Yup.string().required('Reference number is required'),
//  loss_date: Yup.date().required('Loss date is required').nullable(),
//  init_date: Yup.date().required('Initial date is required').nullable(),
// });

export const quotationSchema = rules => {
 console.log('quotationSchema : ', rules?.POL_BACK_DAY);
 const POL_FM_DT = rules?.POL_BACK_DAY;
 return Yup.object().shape({
  frontForm: Yup.object().shape({
   formFields: Yup.object().shape({
    POL_CUST_CODE: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Customer code is required'),
    }),
    POL_ASSR_CUST_FLAG: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Flag is required'),
    }),
    POL_ASSR_CODE: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Assured Code is required'),
    }),
    POL_ASSURED_NAME: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Assured Name is required'),
    }),
    POL_PERIOD: Yup.object().shape({
     PFD_FLD_VALUE: Yup.number()
      .required('Period is required')
      .min(5, 'Period must be greater than 5')
      .max(10, 'Period must be less than 10'),
    }),
    POL_FM_DT: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string()
      .required('From date is required')

      // not allow old dates
      // .test('is-future-date', 'Date should not be outdated', function (value) {
      //  const dateValue = dayjs(value);
      //  const today = dayjs().startOf('day');
      //  return dateValue.isSame(today) || dateValue.isAfter(today);
      // }),

      // last minDate and today date only not future dates
      // .test(
      //  'is-future-or-past-date',
      //  'Date should be within the last 10 days or today',
      //  function (value) {
      //   const dateValue = dayjs(value);
      //   const today = dayjs().startOf('day');
      //   const minDate = dayjs().subtract(10, 'day').startOf('day');
      //   return (
      //    dateValue.isSame(today) ||
      //    (dateValue.isAfter(minDate) && dateValue.isBefore(today.add(1, 'day')))
      //   );
      //  },
      // )

      // allow from minDate and norestrict on future date
      .test(
       'allow from minDate and no-restrict on future date',
       `Date should not be older than ${POL_FM_DT?.ASD_NUM_VALUE} days from today`,
       function (value) {
        const dateValue = dayjs(value);
        const minDate = dayjs().subtract(POL_FM_DT?.ASD_NUM_VALUE, 'day').startOf('day');
        return dateValue.isSame(minDate) || dateValue.isAfter(minDate);
       },
      ),
    }),
    POL_SRC_OF_BUS: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Source of the Bussiness is required'),
    }),
    POL_SA_CURR_CODE: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Currency is required'),
    }),
    POL_MODE_OF_PYMT: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Mode of Payment is required'),
    }),
    POL_NO_OF_INST: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('No of Installment is required'),
    }),
    POL_FC_ANN_SAL: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Annual Salary is required'),
    }),
    POL_FC_SA: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Sum Assured is required'),
    }),
    POL_TO_DT: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('To Date is required'),
    }),
    POL_PYMT_TYPE: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Payment Type is required'),
    }),
    POL_AGENT_CODE: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().test(
      'conditional-requirement',
      'AGENT CODE is required when source of bussiness is Broker/Agent',
      function (value) {
       const POL_SRC_OF_BUS =
        this.options.context.frontForm.formFields.POL_SRC_OF_BUS.PFD_FLD_VALUE;
       if (POL_SRC_OF_BUS === '075') {
        return !!value;
       }
       return true;
      },
     ),
    }),
    POL_PREM_PAY_YRS: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Premium Paying Years is required'),
    }),
    POL_UW_YEAR: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('UW Year is required'),
    }),
    POL_CUST_NAME: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Customer Name is required'),
    }),
    POL_AGENT_COMM_BASIS: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().test(
      'conditional-requirement',
      'Commission Basis is required when source of bussiness is Broker/Agent',
      function (value) {
       const POL_SRC_OF_BUS =
        this.options.context.frontForm.formFields.POL_SRC_OF_BUS.PFD_FLD_VALUE;
       if (POL_SRC_OF_BUS === '075') {
        return !!value;
       }
       return true;
      },
     ),
    }),
   }),
  }),
 });
};

// export const quotationSchema = Yup.object().shape({
//  frontForm: Yup.object().shape({
//   formFields: Yup.object().shape({
//    POL_CUST_CODE: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().required('Customer code is required'),
//    }),
//    POL_ASSR_CUST_FLAG: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().required('Flag is required'),
//    }),
//    POL_ASSR_CODE: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().required('Assured Code is required'),
//    }),
//    POL_ASSURED_NAME: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().required('Assured Name is required'),
//    }),
//    POL_PERIOD: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.number()
//      .required('Period is required')
//      .min(5, 'Period must be greater than 5')
//      .max(10, 'Period must be less than 10'),
//    }),
//    POL_FM_DT: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string()
//      .required('From date is required')
//      .test('is-future-date', 'Date should not be outdated', function (value) {
//       const dateValue = new Date(value);
//       const today = new Date();
//       today.setHours(0, 0, 0, 0);
//       return dateValue >= today;
//      }),
//    }),
//    POL_SRC_OF_BUS: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().required('Source of the Bussiness is required'),
//    }),
//    POL_SA_CURR_CODE: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().required('Currency is required'),
//    }),
//    POL_MODE_OF_PYMT: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().required('Mode of Payment is required'),
//    }),
//    POL_NO_OF_INST: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().required('No of Installment is required'),
//    }),
//    POL_FC_ANN_SAL: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().required('Annual Salary is required'),
//    }),
//    POL_FC_SA: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().required('Sum Assured is required'),
//    }),
//    POL_TO_DT: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().required('To Date is required'),
//    }),
//    POL_PYMT_TYPE: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().required('Payment Type is required'),
//    }),
//    POL_AGENT_CODE: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().test(
//      'conditional-requirement',
//      'AGENT CODE is required when source of bussiness is Broker/Agent',
//      function (value) {
//       const POL_SRC_OF_BUS = this.options.context.frontForm.formFields.POL_SRC_OF_BUS.PFD_FLD_VALUE;
//       if (POL_SRC_OF_BUS === '075') {
//        return !!value;
//       }
//       return true;
//      },
//     ),
//    }),
//    POL_PREM_PAY_YRS: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().required('Premium Paying Years is required'),
//    }),
//    POL_UW_YEAR: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().required('UW Year is required'),
//    }),
//    POL_CUST_NAME: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().required('Customer Name is required'),
//    }),
//    POL_AGENT_COMM_BASIS: Yup.object().shape({
//     PFD_FLD_VALUE: Yup.string().test(
//      'conditional-requirement',
//      'Commission Basis is required when source of bussiness is Broker/Agent',
//      function (value) {
//       const POL_SRC_OF_BUS = this.options.context.frontForm.formFields.POL_SRC_OF_BUS.PFD_FLD_VALUE;
//       if (POL_SRC_OF_BUS === '075') {
//        return !!value;
//       }
//       return true;
//      },
//     ),
//    }),
//   }),
//  }),
// });
