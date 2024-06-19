import * as Yup from 'yup';

export const createYupSchema = data => {
 if (typeof data === 'object' && !Array.isArray(data)) {
  let schema = {};
  for (const key in data) {
   const fieldValue = data[key];
   if (fieldValue?.formFields) {
    let formFieldsSchema = {};
    for (const formField in fieldValue.formFields) {
     if (fieldValue.formFields[formField].PFD_MANDATORY_YN) {
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
   fieldValidation = fieldValidation.required(
    `${formFields[field]?.PFD_FLD_NAME} is required`,
   );
  }
  validation[field] = fieldValidation;
 }
 return Yup.object().shape(validation);
};

// formFieldsSchema.validate(data.formFields)
//   .then(valid => console.log("Valid"))
//   .catch(err => console.error(err));

// const initialValues = {
//  claim_type: 'death',
//  claim_based: 'preclaimNo',
//  preclaimNo: '',
//  reference_no: '',
//  loss_date: '',
//  init_date: '',
// };

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
