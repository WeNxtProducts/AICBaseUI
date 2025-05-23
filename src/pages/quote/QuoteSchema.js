import dayjs from 'dayjs';
import * as Yup from 'yup';

export const basicInfoSchema = () => {
    return Yup.object().shape({
        frontForm: Yup.object().shape({
            formFields: Yup.object().shape({
                QUOT_NAME_TITLE: Yup.object().shape({
                    PFD_FLD_VALUE: Yup.string().required('Title is required'),
                }),

                QUOT_FIRST_NAME: Yup.object().shape({
                    PFD_FLD_VALUE: Yup.string().required('First Name is required'),
                }),

                QUOT_MIDDLE_NAME: Yup.object().shape({
                    PFD_FLD_VALUE: Yup.string().required('Middle Name is required'),
                }),

                QUOT_LAST_NAME: Yup.object().shape({
                    PFD_FLD_VALUE: Yup.string().required('Last Name is required'),
                }),

                QUOT_DOB: Yup.object().shape({
                    PFD_FLD_VALUE: Yup.string()
                        .required('Date of Birth is required')
                        .test('is-18', 'Age must be at least 18 years old', function (value) {
                            if (!value) return false;

                            const birthDate = dayjs(value);
                            if (!birthDate.isValid()) return false;

                            const today = dayjs();
                            const age = today.diff(birthDate, 'year');

                            return age >= 18;
                        }),
                }),

                QUOT_SEX: Yup.object().shape({
                    PFD_FLD_VALUE: Yup.string().required('Gender is required'),
                }),

                QUOT_MOBILE_NO: Yup.object().shape({
                    PFD_FLD_VALUE: Yup.string()
                        .matches(/^\d{10}$/, 'Invalid mobile number')
                        .required('Mobile Number is required'),
                }),

                QUOT_EMAIL_ID: Yup.object().shape({
                    PFD_FLD_VALUE: Yup.string()
                        .email('Invalid email format')
                        .required('Email ID is required'),
                }),

                QUOT_POL_TERM: Yup.object().shape({
                    PFD_FLD_VALUE: Yup.string().required('Policy Term is required'),
                }),

                QUOT_CURR: Yup.object().shape({
                    PFD_FLD_VALUE: Yup.string().required('Currency is required'),
                }),

                QUOT_FC_SA: Yup.object().shape({
                    PFD_FLD_VALUE: Yup.string().required('Sum Assured is required'),
                }),

                QUOT_MOP: Yup.object().shape({
                    PFD_FLD_VALUE: Yup.string().required('Mode of Payment is required'),
                }),
                QUOT_NATIONAL: Yup.object().shape({
                    PFD_FLD_VALUE: Yup.string().required('Nationality is required'),
                }),
                QUOT_SMOKER_YN: Yup.object().shape({
                    PFD_FLD_VALUE: Yup.string().required('Smoker is required'),
                }),
                // QUOT_COUNT_RESIDENCE: Yup.object().shape({
                //     PFD_FLD_VALUE: Yup.string().required('Country of Residence is required'),
                // }),
            }),
        }),
    });
};