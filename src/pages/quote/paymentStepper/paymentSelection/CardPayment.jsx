import React from "react";
import { Input, Button, DatePicker, Form } from "antd";
import { CreditCardOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Formik } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";
import { setLoader, setPayFinish, setQuoteStepStatus } from "../../../../globalStore/slices/QuoteSlice";
import useApiRequests from "../../../../services/useApiRequests";
import showNotification from "../../../../components/notification/Notification";

const CardPayment = () => {
    const dispatch = useDispatch();
    const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
    const { QUOT_FIRST_NAME: { PFD_FLD_VALUE: Fname } = {},
        QUOT_MIDDLE_NAME: { PFD_FLD_VALUE: Mname } = {},
        QUOT_LAST_NAME: { PFD_FLD_VALUE: Lname } = {} }
        = useSelector(state => state?.quote?.basicInfoForm?.frontForm?.formFields || {});
    const name = `${Fname} ${Mname} ${Lname}`.trim();
    const emailTrigger = useApiRequests('emailTrigger', 'POST');
    const { quotationNo, tranId } = useSelector(state => state?.quote);

    const initialValues = {
        cardNumber: "",
        name: "",
        expiryDate: null,
        cvv: ""
    };

    const validationSchema = Yup.object().shape({
        cardNumber: Yup.string()
            .required("Card number is required")
            .matches(/^(\d{4} \d{4} \d{4} \d{4})$/, "Card number must be 16 digits"),
        name: Yup.string().required("Name is required"),
        expiryDate: Yup.date()
            .nullable()
            .required("Expiry date is required"),
        cvv: Yup.string()
            .required("CVV is required")
    });

    const handleProcedureCall = async (values) => {
        dispatch(setLoader(true));
        const payload = {
            inParams: {
                P_POL_TRAN_ID: tranId,
                P_POL_NO: quotationNo,
                V_POL_ISSUE_DT: dayjs().format('D/MM/YYYY')
            }
        };
        try {
            const response = await invokeClaimsProcedure(payload, {
                procedureName: 'PROP_CONVERT',
                packageName: 'WNPKG_QUICK_QUOTE',
            });
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                handleSendEmail();
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            dispatch(setLoader(false));
        }
    };

    const handleSendEmail = async () => {
        dispatch(setLoader(true));
        const payload = {
            toIds: [
                "kuzhandaivel.k@wenxttech.com"
            ],
            ccIds: [
                "sivaram.r@wenxttech.com",
                // "coo@wenxttech.com",
                'timothygodwin@wenxttech.com'
            ],
            subject: `Policy Number. - ${quotationNo}`,
            content: {
                sysId: 28,
                parameter: "Variable from JSON"
            }
        }

        try {
            const response = await emailTrigger(payload, {
                templateId: 123,
            });
            if (response?.status === 'FAILURE') {
                showNotification.ERROR(response?.status_msg);
            } else if (response?.status === 'SUCCESS') {
                dispatch(setQuoteStepStatus(7))
                dispatch(setPayFinish(true));
                showNotification.SUCCESS(response?.status_msg);
            }
        } catch (err) {
            showNotification.WARNING(err?.message || 'Something went wrong');
        } finally {
            dispatch(setLoader(false));
        }
    }

    const onSubmit = (values) => {
        handleProcedureCall(values);
    }

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {({ handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue, isSubmitting }) => (
                <Form layout="vertical" onFinish={handleSubmit} className="card-payment">
                    <Form.Item
                        label="Card Number"
                        validateStatus={touched.cardNumber && errors.cardNumber ? "error" : ""}
                        help={touched.cardNumber && errors.cardNumber}
                    >
                        <Input
                            name="cardNumber"
                            value={values.cardNumber}
                            onChange={(e) => {
                                const formatted = e.target.value.replace(/\D/g, "").slice(0, 16).replace(/(\d{4})/g, "$1 ").trim();
                                setFieldValue("cardNumber", formatted);
                            }}
                            onBlur={handleBlur}
                            placeholder="XXXX XXXX XXXX XXXX"
                            suffix={<CreditCardOutlined />}
                        />
                    </Form.Item>

                    <Form.Item
                        label="Name on card"
                        validateStatus={touched.name && errors.name ? "error" : ""}
                        help={touched.name && errors.name}
                    >
                        <Input
                            name="name"
                            value={values.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder="Name"
                        />
                    </Form.Item>

                    <div className="expiry-cvv-container" style={{ display: 'flex', gap: '1rem' }}>
                        <Form.Item
                            label="Expiry Date"
                            validateStatus={touched.expiryDate && errors.expiryDate ? "error" : ""}
                            help={touched.expiryDate && errors.expiryDate}
                            style={{ flex: 1 }}
                        >
                            <DatePicker
                                name="expiryDate"
                                picker="month"
                                format="MM / YYYY"
                                placeholder="MM / YYYY"
                                value={values.expiryDate}
                                onChange={(date) => setFieldValue("expiryDate", date)}
                                onBlur={handleBlur}
                                disabledDate={(current) => current && current < dayjs().startOf("month")}
                                className="expiry-picker"
                            />
                        </Form.Item>

                        <Form.Item
                            label="CVV"
                            validateStatus={touched.cvv && errors.cvv ? "error" : ""}
                            help={touched.cvv && errors.cvv}
                            style={{ flex: 1 }}
                        >
                            <Input
                                name="cvv"
                                value={values.cvv}
                                onChange={(e) => {
                                    const formatted = e.target.value.replace(/\D/g, "").slice(0, 3);
                                    setFieldValue("cvv", formatted);
                                }}
                                onBlur={handleBlur}
                                placeholder="•••"
                                type="password"
                                maxLength={3}
                            />
                        </Form.Item>
                    </div>

                    <Button
                        type="primary"
                        htmlType="submit"
                        className="pay-now-btn"
                        disabled={isSubmitting}
                    >
                        Pay Now
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default CardPayment;
