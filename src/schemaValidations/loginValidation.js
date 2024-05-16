import * as Yup from 'yup';

export const loginValidationSchema = Yup.object().shape({
 userName: Yup.string().required('UserName is required'),
 password: Yup.string().required('Password is required'),
 companyCode: Yup.string().required('Company is required'),
 divisionCode: Yup.string().required('Branch is required'),
 departmentCode: Yup.string().required('Department is required'),
 langCode: Yup.string().required('Language is required'),
});

export const createValidationSchema = formData => {
 const validationSchema = {};
 Object.keys(formData).forEach(fieldKey => {
  const field = formData[fieldKey];
  if (field.PFD_MANDATORY_YN) {
   validationSchema[fieldKey] = Yup.object().shape({
    PFD_FLD_VALUE: Yup.string().required(`${field.PFD_FLD_NAME} is required`),
   });
  } else {
   validationSchema[fieldKey] = Yup.object().shape({
    PFD_FLD_VALUE: Yup.string(),
   });
  }
 });

 return Yup.object().shape({
  formFields: Yup.object().shape(validationSchema),
 });
};

// useEffect(() => {
//   const mainValidation = createValidationSchema(
//    userMaster?.frontForm?.formFields,
//   );
//   const mainForm = Yup.object().shape({ frontForm: mainValidation });
//   // setValidation(mainForm);
//  }, []);
