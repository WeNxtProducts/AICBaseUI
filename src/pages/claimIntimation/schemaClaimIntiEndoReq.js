import * as Yup from 'yup';

export const claimIntimationSchema = (type) => {
    return Yup.object().shape({
        CI_POL_NO: Yup.string()
            .required('Policy number is required'),
        CI_TYPE: Yup.string()
            .required('Type is required'),
        CI_CONTACT_PER: Yup.string()
            .required('Contact person is required'),
        CI_CONTACT_NO: Yup.string()
            .required('Contact number is required')
            .matches(/^\d{10}$/, 'Contact number must be exactly 10 digits'),
        CI_INTM_DT: type === 'C'
            ? Yup.date()
                .required('Intimation date is required')
                .typeError('Intimation date must be a valid date')
            : Yup.mixed().notRequired(),
        CI_LOSS_DT: type === 'C'
            ? Yup.date()
                .required('Loss date is required')
                .max(new Date(), 'Loss date cannot be in the future')
                .typeError('Loss date must be a valid date')
            : Yup.mixed().notRequired(),
        CI_EMAIL: type === 'E'
            ? Yup.string()
                .required('Email is required')
                .email('Email must be a valid email address')
            : Yup.mixed().notRequired(),
    });
};
