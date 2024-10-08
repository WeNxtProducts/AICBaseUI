import dayjs from 'dayjs';
import * as Yup from 'yup';

export const quotationSchema = (userRules, proRules, isSave) => {
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
      .test('dynamic-date-validation', function (value) {
       const POL_FM_DT = userRules?.POL_BACK_DAY;
       const { ASD_FLAG, ASD_NUM_VALUE } = POL_FM_DT || {};
       const dateValue = dayjs(value);
       const today = dayjs().startOf('day');
       const minDate = dayjs().subtract(ASD_NUM_VALUE, 'day').startOf('day');

       if (isSave) {
        switch (ASD_FLAG) {
         case '1':
          // Test for future dates only
          if (!dateValue.isSame(today) && dateValue.isBefore(today)) {
           return this.createError({ message: 'Date should not be outdated' });
          }
          return true;

         case '2':
          // Allow dates from minDate with no restriction on future dates
          if (!dateValue.isSame(minDate) && !dateValue.isAfter(minDate)) {
           return this.createError({
            message: `Date should not be older than ${ASD_NUM_VALUE} days from today`,
           });
          }
          return true;

         case '3':
          // Test for dates within the last ASD_NUM_VALUE days or today
          if (
           !dateValue.isSame(today) &&
           !(dateValue.isAfter(minDate) && dateValue.isBefore(today.add(1, 'day')))
          ) {
           return this.createError({
            message: `Date should be within the last ${ASD_NUM_VALUE} days or today`,
           });
          }
          return true;

         default:
          return true;
        }
       } else if (!isSave) {
        return true;
       }
       return true;
      }),

     // not allow old dates
     // .test('is-future-date', 'Date should not be outdated', function (value) {
     //  const dateValue = dayjs(value);
     //  const today = dayjs().startOf('day');
     //  return dateValue.isSame(today) || dateValue.isAfter(today);
     // }),

     // last minDate and today date only not future dates
     // .test(
     //  'is-future-or-past-date',
     //  `Date should be within the last ${POL_FM_DT?.ASD_NUM_VALUE} days or today`,
     //  function (value) {
     //   const dateValue = dayjs(value);
     //   const today = dayjs().startOf('day');
     //   const minDate = dayjs().subtract(POL_FM_DT?.ASD_NUM_VALUE, 'day').startOf('day');
     //   return (
     //    dateValue.isSame(today) ||
     //    (dateValue.isAfter(minDate) && dateValue.isBefore(today.add(1, 'day')))
     //   );
     //  },
     // )

     // allow from minDate and norestrict on future date
     // .test(
     //  'allow from minDate and no-restrict on future date',
     //  `Date should not be older than ${POL_FM_DT?.ASD_NUM_VALUE} days from today`,
     //  function (value) {
     //   const dateValue = dayjs(value);
     //   const minDate = dayjs().subtract(POL_FM_DT?.ASD_NUM_VALUE, 'day').startOf('day');
     //   return dateValue.isSame(minDate) || dateValue.isAfter(minDate);
     //  },
     // ),
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

export const lifeAssuredSchema = (userRule, proRule) => {
 return Yup.object().shape({
  life_assured_details: Yup.object().shape({
   formFields: Yup.object().shape({
    PEMP_ID: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Assured is required'),
    }),

    PEMP_FC_SA: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Total Sum Assured is required'),
    }),

    PEMP_BMI: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('BMI is required'),
    }),

    PEMP_DOB: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('DOB is required'),
    }),

    PEMP_NAME: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Assured Name is required'),
    }),

    PEMP_WEIGHT: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Weight is required'),
    }),

    PEMP_OCC_CODE: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Occupation code is required'),
    }),

    PEMP_MEMBER_TYPE: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Member Type is required'),
    }),

    PEMP_OCC_CATG: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Occupation Category is required'),
    }),

    PEMP_HEIGHT: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Height is required'),
    }),

    PEMP_CATG_CODE: Yup.object().shape({
     PFD_FLD_VALUE: Yup.string().required('Gender is required'),
    }),
   }),
  }),
 });
};
