import * as Yup from 'yup';

// Define the validation schema
export const claimIntimationSchema = Yup.object().shape({
    CI_POL_NO: Yup.string()
        .required('Policy number is required'),
    CI_INTM_DT: Yup.date()
        .required('Intimation date is required')
        .typeError('Intimation date must be a valid date'),
    CI_TYPE: Yup.string()
        .required('Type is required'),
    CI_LOSS_DT: Yup.date()
        .required('Loss date is required')
        .max(new Date(), 'Loss date cannot be in the future')
        .typeError('Loss date must be a valid date'),
    CI_CONTACT_PER: Yup.string()
        .required('Contact person is required'),
    CI_CONTACT_NO: Yup.string()
        .required('Contact number is required')
        .matches(/^\d{10}$/, 'Contact number must be exactly 10 digits'),
});
