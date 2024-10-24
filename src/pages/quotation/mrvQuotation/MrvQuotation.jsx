import React, { useContext, useEffect, useState } from 'react';
import useMRVListing from '../../../components/mrvListing/useMRVListing';
import useApiRequests from '../../../services/useApiRequests';
import showNotification from '../../../components/notification/Notification';
import { deepCopy, extractFieldValuesInPlace } from '../../../components/commonHelper/DataSend';
import { sortObjectByPFDSeqNo } from '../../../components/commonHelper/SortBySequence';
import { getQueryId } from '../../../components/commonHelper/QueryIdFetch';
import { extractValues, mergeDropdownData } from '../../../components/commonHelper/ParamLov';
import Loader from '../../../components/loader/Loader';
import ConfirmationModal from '../../../components/confirmationModal/ConfirmationModal';
import { StepperContext } from '../Quotation';
import MRVQuotationForm from './MRVHelper/MRVQuotationForm';
import MRVListingQuotation from './MRVHelper/MRVListing';
import MRVModal from './MRVHelper/MRVInModal/MRVModal';
import useParamLov from '../../../components/useParamLov/useParamLov';
import dayjs from 'dayjs';
import { calculateDateAfterYears } from '../../../components/commonHelper/CurrentFormatter';
import '../../../styles/components/MRV_Card.scss';
import CustomMediaUpload from './../../../components/customFieldComponents/customMediaUpload/CustomMediaUpload';

const MrvQuotation = ({
  tranId,
  queryID,
  root,
  mrvGet,
  screenCode,
  screenName,
  saveRow,
  editRow,
  deleteRow,
  title,
  action = true,
  isView = true,
  isEdit = true,
  isDelete = true,
  subId = '',
  medicalId = '',
  schemaValidation
}) => {
  const { QuotationJSON, formValues, setDropDown, dropDown, freeze, handleNext, userRules, isPremCalc, proRules } =
    useContext(StepperContext);
  const { mrvListingId } = QuotationJSON;
  const { rowData, columnData, handleMRVListing } = useMRVListing();
  const { onSearch } = useParamLov();
  const mrvGetById = useApiRequests(mrvGet, 'GET');
  const getParamLov = useApiRequests('getParamLov', 'GET');
  const saveMRV = useApiRequests(saveRow, 'POST');
  const editMRV = useApiRequests(editRow, 'POST');
  const deleteMRV = useApiRequests(deleteRow, 'POST');
  const getMapQuery = useApiRequests('getPreClaimDate', 'POST');
  const invokeClaimsProcedure = useApiRequests('invokeClaimsProcedure', 'POST');
  const [quotationMRV, setQuotationMRV] = useState(null);
  const [quotationMRVInitialValues, setQuotationMRVInitialValues] = useState(null);
  const [editMRVId, setEditMRVId] = useState('');
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [loader, setLoader] = useState(false);
  const [first, setFirst] = useState(false);
  const [formInit, setFormInit] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState('');

  const nextStep = () => {
    if (root !== 'life_assured_details') {
      handleNext();
    } else if (root === 'life_assured_details') {
      if (hasValidRowData(rowData)) {
        const hasMemberTypeP = rowData.some(item => item.Member_Type === 'P');
        if (hasMemberTypeP) handleNext();
        else showNotification.WARNING('Add Primary Life Assured Details');
      } else {
        showNotification.WARNING('Add atleast 1 Life Assured Details');
      }
    }
  };

  const addOrUpdateMRV = async (payload, addOrUpdate, lifeId) => {
    try {
      const params = editMRVId ? { editMRVId } : {
        tranId, ...(lifeId && { lifeId })
        , ...(medicalId && { medicalId })
      };
      const response = await addOrUpdate(payload, '', params);
      if (response?.status === 'FAILURE') showNotification.ERROR(response?.status_msg);
      if (response?.status === 'SUCCESS') {
        MRVListing();
        if (!editMRVId) {
          handleInitData(QuotationJSON);
          setFormInit(!formInit);
        }
        // setEditMRVId(response?.data?.Id ?? editMRVId);
        showNotification.SUCCESS(response?.status_msg);
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);
    }
  };

  const onSubmit = values => {
    const val = deepCopy(values);
    const modifiedData = extractFieldValuesInPlace(val);
    const payload = { [root]: { formFields: modifiedData[root]?.formFields } };

    if (root === 'benificiary') {
      const percentage = payload[root]?.formFields?.PGBEN_SHARE_PERC;
      const totalPercentage =
        rowData.reduce((sum, item) => {
          if (item.ID === editMRVId) return sum;
          return sum + (Number(item?.Percentage) || 0);
        }, 0) + Number(percentage);
      if (percentage > 100) {
        showNotification.WARNING('Percentage should not exceed 100');
        return;
      } else if (totalPercentage > 100) {
        showNotification.WARNING('Total percentage should not exceed 100');
        return;
      } else {
        addOrUpdateMRV(payload, editMRVId ? editMRV : saveMRV, subId || '');
      }
    } else addOrUpdateMRV(payload, editMRVId ? editMRV : saveMRV, subId || '');
  };

  const handleInitData = async response => {
    const orderedData = sortObjectByPFDSeqNo(response);
    if (!freeze || freeze) {
      if (root === 'life_assured_details') {
        const { POL_ASSURED_NAME, POL_ASSR_CODE } = formValues.frontForm.formFields;
        const { PEMP_MEMBER_TYPE, PEMP_NAME, PEMP_ID } = orderedData.life_assured_details.formFields;
        const makeDropdown = { ...dropDown };

        if (PEMP_MEMBER_TYPE?.PFD_FLD_VALUE === 'P') {
          const payload = { queryParams: { CUST_CODE: POL_ASSR_CODE?.PFD_FLD_VALUE } };
          let response;
          response = await handleGetData(payload, 190);
          const newState = {
            ...orderedData,
            life_assured_details: {
              ...orderedData.life_assured_details,
              formFields: {
                ...orderedData.life_assured_details.formFields,
                PEMP_ID: {
                  ...orderedData.life_assured_details.formFields.PEMP_ID,
                  PFD_FLD_VALUE: POL_ASSR_CODE?.PFD_FLD_VALUE,
                  PFD_EDIT_YN: PEMP_MEMBER_TYPE?.PFD_FLD_VALUE !== 'P',
                },
                PEMP_NAME: {
                  ...orderedData.life_assured_details.formFields.PEMP_NAME,
                  PFD_FLD_VALUE: POL_ASSURED_NAME?.PFD_FLD_VALUE,
                },
                PEMP_CATG_CODE: {
                  ...orderedData.life_assured_details.formFields.PEMP_CATG_CODE,
                  PFD_FLD_VALUE: response?.PEMP_CATG_CODE || '',
                },
                PEMP_DOB: {
                  ...orderedData.life_assured_details.formFields.PEMP_DOB,
                  PFD_FLD_VALUE: response?.PEMP_DOB || '',
                },
              },
            },
          };
          makeDropdown.PEMP_ID = [
            {
              value: POL_ASSR_CODE?.PFD_FLD_VALUE || PEMP_ID?.PFD_FLD_VALUE,
              label: POL_ASSURED_NAME?.PFD_FLD_VALUE || PEMP_NAME?.PFD_FLD_VALUE,
            },
          ];
          setQuotationMRV({ [root]: newState[root] });
          setQuotationMRVInitialValues({ [root]: newState[root] });
        } else if (PEMP_MEMBER_TYPE?.PFD_FLD_VALUE !== 'P') {
          setQuotationMRV({ [root]: orderedData[root] });
          setQuotationMRVInitialValues({ [root]: orderedData[root] });
          const { PEMP_NAME, PEMP_ID } = orderedData.life_assured_details.formFields;
          makeDropdown.PEMP_ID = [{ value: PEMP_ID?.PFD_FLD_VALUE, label: PEMP_NAME?.PFD_FLD_VALUE }];
        }

        setDropDown(makeDropdown);
      } else if (root === 'benificiary') {
        const { PGBEN_BNF_NAME, PGBEN_BNF_CODE } = orderedData.benificiary.formFields;
        const label = PGBEN_BNF_NAME?.PFD_FLD_VALUE;
        const value = PGBEN_BNF_CODE?.PFD_FLD_VALUE;
        setDropDown(prev => ({
          ...prev,
          PGBEN_BNF_CODE: [{ value, label }],
        }));
        setQuotationMRV({ [root]: orderedData[root] });
        setQuotationMRVInitialValues({ [root]: orderedData[root] });
      } else if (root === 'Charges') {
        // const { PCHRG_DESC, PCHRG_CODE } = orderedData.Charges.formFields;
        // const label = PCHRG_DESC?.PFD_FLD_VALUE;
        // const value = PCHRG_CODE?.PFD_FLD_VALUE;
        // setDropDown(prev => ({
        //  ...prev,
        //  PCHRG_CODE: [{ value, label }],
        // }));
        setQuotationMRV({ [root]: orderedData[root] });
        setQuotationMRVInitialValues({ [root]: orderedData[root] });
      } else if (root === 'Discount_Loading') {
        const { PDL_APPLIED_ON } = orderedData.Discount_Loading.formFields;
        const isMandatory = ['3', '6', '7', '8', '9'].includes(PDL_APPLIED_ON?.PFD_FLD_VALUE);
        const newState = {
          ...orderedData,
          Discount_Loading: {
            ...orderedData.Discount_Loading,
            formFields: {
              ...orderedData.Discount_Loading.formFields,
              PDL_COVER_CODE: {
                ...orderedData.Discount_Loading.formFields.PDL_COVER_CODE,
                PFD_MANDATORY_YN: isMandatory,
              },
            },
          },
        };

        setQuotationMRV({ [root]: newState[root] });
        setQuotationMRVInitialValues({ [root]: newState[root] });
      } else {
        setQuotationMRV({ [root]: orderedData[root] });
        setQuotationMRVInitialValues({ [root]: orderedData[root] });
      }
    } else {
      setQuotationMRV({ [root]: orderedData[root] });
      setQuotationMRVInitialValues({ [root]: orderedData[root] });
    }
  };

  const MRVListing = () => {
    if (tranId) {
      const queryId = getQueryId(queryID, mrvListingId);
      handleMRVListing(queryId, tranId, subId, medicalId);
    }
  };

  //  useEffect(() => {
  //   if (rowData?.length > 0 && !editMRVId && !first) {
  //    setFirst(true);
  //    handleEdit(rowData[0]);
  //   }
  //  }, [rowData]);

  useEffect(() => {
    setEditMRVId('');
    if ((root !== 'benificiary' && tranId) || (root === 'benificiary' && subId)) {
      handleInitData(QuotationJSON);
      MRVListing();
    } else {
      handleInitData(QuotationJSON);
    }
  }, [tranId, subId, freeze, isPremCalc]);

  const handleChangeValue = (value, path, setFieldValue, values) => {
    setFieldValue(path, value);
  };

  const resetForm = () => {
    setEditMRVId('');
    handleInitData(QuotationJSON);
  };

  const handleEdit = async item => {
    try {
      const response = await mrvGetById('', {
        screenCode,
        screenName,
        tranId: item?.ID,
      });
      setEditMRVId(item?.ID);
      handleInitData(response?.Data);
    } catch (err) {
      console.log('err : ', err);
    }
  };

  const handleDeleteConfirm = async id => {
    setLoader(true);
    try {
      const response = await deleteMRV('', {}, { id });
      if (response?.status === 'SUCCESS') {
        MRVListing();
        if (id === editMRVId) resetForm();
        showNotification.SUCCESS(response?.status_msg);
      } else if (response?.status === 'FAILURE') {
        showNotification.ERROR(response?.status_msg);
      }
      setEditMRVId('');
      setDeleteConfirmation(false);
      setLoader(false);
    } catch (err) {
      console.log('err  : ', err);
    }
  };

  const handleClose = status => {
    const deleteId = editMRVId;
    // setEditMRVId('');
    if (status) handleDeleteConfirm(deleteId);
    else if (!status) setDeleteConfirmation(false);
  };

  const handleDelete = item => {
    setEditMRVId(item?.ID);
    setDeleteConfirmation(true);
  };

  const apiCallsParamLov = (PFD_PARAM_2, valueKey, valueQueryId) => {
    const promises = PFD_PARAM_2.map(item => {
      const queryParams = { queryId: valueQueryId[item], ...valueKey };
      return getParamLov('', queryParams);
    });

    Promise.all(promises)
      .then(responses => {
        if (responses[0].status === 'SUCCESS') {
          const mergedData = mergeDropdownData(responses);
          setDropDown(prevDropdown => {
            return { ...prevDropdown, ...mergedData };
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  //  const handleOnBlur = (currentData, values) => {
  //   // if (currentData.hasOwnProperty('PFD_PARAM_2')) {
  //   if (Object.prototype.hasOwnProperty.call(currentData, 'PFD_PARAM_2')) {
  //    const PFD_PARAM_2 = currentData?.PFD_PARAM_2.split(',');
  //    const PFD_PARAM_3 = currentData?.PFD_PARAM_3.split(',');
  //    const valueKey = extractValues(PFD_PARAM_3, values, 'PFD_FLD_VALUE');
  //    const valueQueryId = extractValues(PFD_PARAM_2, formValues, 'PFD_PARAM_1');
  //    apiCallsParamLov(PFD_PARAM_2, valueKey, valueQueryId);
  //   }
  //  };

  const procedureCall = async (height, weight) => {
    const payload = {
      inParams: {
        P_HEIGHT: height,
        P_WEIGHT: weight,
        P_HEIGHT_UNIT: 'CM',
        P_WEIGHT_UNIT: 'KG',
      },
    };
    try {
      const response = await invokeClaimsProcedure(payload, {
        procedureName: 'PR_BMI_CALC',
        packageName: 'WNPKG_COMMON',
      });
      if (response?.status === 'FAILURE') {
        showNotification.ERROR(response?.status_msg);
        return null;
      } else if (response?.status === 'SUCCESS') {
        return response?.Data?.P_BMI;
      }
    } catch (err) {
      setLoader(false);
      return null;
    }
  };

  const handleGetData = async (payload, qId) => {
    try {
      const response = await getMapQuery(payload, { queryId: qId });
      if (response?.status === 'SUCCESS') {
        return response?.Data[0];
      } else if (response?.status === 'FAILURE') {
        showNotification.ERROR(response?.status_msg);
      }
    } catch (err) {
      console.log('err  : ', err);
    }
  };

  const changeState = (root, field, key, value) => {
    setQuotationMRV(prevState => ({
      ...prevState,
      [root]: {
        ...prevState[root],
        formFields: {
          ...prevState[root].formFields,
          [field]: {
            ...prevState[root].formFields[field],
            [key]: value,
          },
        },
      },
    }));
  };

  const procedureCallAgeCheck = async (payload) => {
    try {
      const response = await invokeClaimsProcedure(payload,
        { procedureName: 'PR_AGE_CAL' }
      );
      if (response?.status === "SUCCESS") {
        const { PROD_MAX_AGE } = proRules
        const { P_AGE } = response.Data
        if (P_AGE) {
          if (P_AGE <= PROD_MAX_AGE) {
            return true
          } else if (P_AGE > PROD_MAX_AGE) {
            showNotification.WARNING(`Assured code age should be less than ${PROD_MAX_AGE}`);
            return false
          }
        }
      } else if (response?.status === 'FAILURE') {
        showNotification.ERROR(response?.status_msg);
        return false
      }
      setLoader(false);
    } catch (err) {
      setLoader(false);
    }
  };

  const commonAgeCheck = async (val, setFieldValue, POL_FM_DT) => {
    if (val && POL_FM_DT?.PFD_FLD_VALUE) {
      const payload = {
        inParams: { P_ASSR_CODE: val, P_START_DT: POL_FM_DT?.PFD_FLD_VALUE }
      }
      const validateAge = await procedureCallAgeCheck(payload);
      if (!validateAge) {
        setFieldValue('life_assured_details.formFields.PEMP_ID.PFD_FLD_VALUE', '');
        setFieldValue('life_assured_details.formFields.PEMP_NAME.PFD_FLD_VALUE', '');
      } else if (validateAge) {
        const payload = { queryParams: { CUST_CODE: val } };
        const response = await handleGetData(payload, 190);
        for (let key in response) {
          if (Object.prototype.hasOwnProperty.call(response, key)) {
            setFieldValue(`life_assured_details.formFields.${key}.PFD_FLD_VALUE`, response[key]);
          }
        }
      }
    }
  }

  const handleOnBlur = async (currentData, values, setFieldValue, val, label) => {
    if (!freeze) {
      const key = currentData?.PFD_COLUMN_NAME;
      if (root === 'life_assured_details') {
        if (key === 'PEMP_HEIGHT' || key === 'PEMP_WEIGHT') {
          const {
            PEMP_HEIGHT: { PFD_FLD_VALUE: heightStr } = {},
            PEMP_WEIGHT: { PFD_FLD_VALUE: weightStr } = {},
          } = values.life_assured_details?.formFields || {};
          const height = +heightStr || 0;
          const weight = +weightStr || 0;
          if (height > 0 && weight > 0) {
            const bmi = await procedureCall(height, weight);
            setFieldValue('life_assured_details.formFields.PEMP_BMI.PFD_FLD_VALUE', bmi);
          } else {
            //  showNotification.WARNING('Height Should be greater than 0');
          }
        }
        if (key === 'PEMP_MEMBER_TYPE') {
          const { POL_ASSURED_NAME, POL_ASSR_CODE } = formValues.frontForm.formFields;
          const { PEMP_MEMBER_TYPE } = values.life_assured_details.formFields;
          if (val === 'P') {
            const payload = { queryParams: { CUST_CODE: POL_ASSR_CODE?.PFD_FLD_VALUE } };
            const response = await handleGetData(payload, 190);
            setFieldValue(
              `life_assured_details.formFields.${'PEMP_ID'}.PFD_FLD_VALUE`,
              POL_ASSR_CODE?.PFD_FLD_VALUE,
            );
            setFieldValue(
              `life_assured_details.formFields.${'PEMP_NAME'}.PFD_FLD_VALUE`,
              POL_ASSURED_NAME?.PFD_FLD_VALUE,
            );
            setFieldValue(
              `life_assured_details.formFields.${'PEMP_CATG_CODE'}.PFD_FLD_VALUE`,
              response?.PEMP_CATG_CODE,
            );
            setFieldValue(
              `life_assured_details.formFields.${'PEMP_DOB'}.PFD_FLD_VALUE`,
              response?.PEMP_DOB,
            );
            changeState(
              'life_assured_details',
              'PEMP_ID',
              'PFD_EDIT_YN',
              PEMP_MEMBER_TYPE?.PFD_FLD_VALUE !== 'P',
            );
            setDropDown(prev => ({
              ...prev,
              PEMP_ID: [{ value: POL_ASSR_CODE?.PFD_FLD_VALUE, label: POL_ASSURED_NAME?.PFD_FLD_VALUE }],
            }));
          } else if (val !== 'P') {
            changeState(
              'life_assured_details',
              'PEMP_ID',
              'PFD_EDIT_YN',
              PEMP_MEMBER_TYPE?.PFD_FLD_VALUE !== 'P',
            );
          }
        }
        if (key === 'PEMP_ID') {
          setFieldValue(`life_assured_details.formFields.${'PEMP_NAME'}.PFD_FLD_VALUE`, label);
          if (formValues !== null && val) {
            console.log("formValues : ", formValues?.frontForm?.formFields?.POL_FM_DT)
            const { POL_FM_DT } = formValues.frontForm.formFields
            if (val && POL_FM_DT?.PFD_FLD_VALUE) {
              commonAgeCheck(val, setFieldValue, POL_FM_DT)
            }
            // const payload = { queryParams: { CUST_CODE: val } };
            // const response = await handleGetData(payload, 190);
            // for (let key in response) {
            //   if (Object.prototype.hasOwnProperty.call(response, key)) {
            //     setFieldValue(`life_assured_details.formFields.${key}.PFD_FLD_VALUE`, response[key]);
            //   }
            // }
          }
        }
      } else if (root === 'benificiary') {
        if (key === 'PGBEN_BNF_CODE') {
          if (formValues !== null && val) {
            const payload = {
              queryParams: {
                CUST_CODE: val,
                POL_START_DT: dayjs(formValues?.frontForm?.formFields?.POL_FM_DT?.PFD_FLD_VALUE).format(
                  'YYYY-MM-DD',
                ),
              },
            };
            const response = await handleGetData(payload, 183);
            for (let key in response) {
              if (Object.prototype.hasOwnProperty.call(response, key)) {
                setFieldValue(`benificiary.formFields.${key}.PFD_FLD_VALUE`, response[key]);
              }
            }

            const age = response?.PGBEN_AGE;
            if (age < 18 || age > 60) {
              changeState('benificiary', 'PGBEN_GUARDIAN_NAME', 'PFD_MANDATORY_YN', true);
            }
          }
        }
      } else if (root === 'Discount_Loading') {
        if (key === 'PDL_APPLIED_ON') {
          const isMandatory = ['3', '6', '7', '8', '9'].includes(val);
          changeState('Discount_Loading', 'PDL_COVER_CODE', 'PFD_MANDATORY_YN', isMandatory);
        }
      } else if (root === 'pol_riders') {
        if (key === 'PEC_EFF_FM_DT' || key === 'PEC_PERIOD') {
          if (key === 'PEC_EFF_FM_DT') {
            const period = values?.pol_riders?.formFields?.PEC_PERIOD?.PFD_FLD_VALUE;
            setFieldValue(
              'pol_riders.formFields.PEC_EFF_TO_DT.PFD_FLD_VALUE',
              calculateDateAfterYears(val, period),
            );
          } else if (key === 'PEC_PERIOD') {
            const stDate = values?.pol_riders?.formFields?.PEC_EFF_FM_DT?.PFD_FLD_VALUE;
            setFieldValue(
              'pol_riders.formFields.PEC_EFF_TO_DT.PFD_FLD_VALUE',
              calculateDateAfterYears(stDate, val),
            );
          }
        }
      }
    }
    // else if (root === 'Charges') {
    //  if (key === 'PCHRG_CODE') {
    //   setFieldValue(`Charges.formFields.${'PCHRG_DESC'}.PFD_FLD_VALUE`, label);
    //  }
    // }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setModalType('');
  };

  const handleCardActions = (type, item) => {
    handleEdit(item);
    setEditMRVId(item?.ID);
    setModalType(type);
    setOpenModal(true);
  };

  const hasValidRowData = rowData => {
    return rowData && rowData.length > 0 && Object.keys(rowData[0]).length > 0;
  };

  const handleOnSearch = async (currentData, values, setFieldValue, val) => {
    const key = currentData?.PFD_COLUMN_NAME;
    if (Object.prototype.hasOwnProperty.call(currentData, 'PFD_PARAM_4')) {
      if (
        [
          'PGBEN_BNF_CODE',
          //  'PCHRG_CODE',
          'PDL_DISC_LOAD_CODE',
          'PDL_COVER_CODE',
          'PEMP_ID',
          'PEC_COVER_CODE',
        ].includes(key)
      ) {
        let payload;
        if (key === 'PDL_DISC_LOAD_CODE') {
          payload = {
            type: values?.Discount_Loading?.formFields?.PDL_DISC_LOAD_TYPE?.PFD_FLD_VALUE || '',
          };
        } else if (key === 'PDL_COVER_CODE' || key === 'PEC_COVER_CODE') {
          payload = { tranId };
        }

        if (val?.length > 0) {
          const response = await onSearch(currentData?.PFD_PARAM_4, val, payload);
          setDropDown(prev => ({
            ...prev,
            [key]: response?.Data?.[key],
          }));
        }
      }
    }
  };

  return (
    <div className='front-form claim-cover grid grid-cols-8 gap-1'>
      {loader && <Loader />}
      <div className='propasal-entry-form col-span-8 grid grid-cols-9'>
        <div className={`col-span-${hasValidRowData(rowData) ? '7' : '9'} mt-1`}>
          {quotationMRV && Object.prototype.hasOwnProperty.call(quotationMRV, root) && (
            <>
              <MRVQuotationForm
                initialValues={quotationMRVInitialValues}
                formRender={quotationMRV}
                schemaValidation={schemaValidation}
                root={root}
                lovList={dropDown}
                onSubmit={onSubmit}
                handleChangeValue={handleChangeValue}
                resetForm={resetForm}
                handleOnBlur={handleOnBlur}
                addOrUpdate={!!editMRVId}
                smallFont={true}
                title={title}
                action={action}
                freeze={freeze}
                handleOnSearch={handleOnSearch}
                formInit={formInit}
                nextStep={nextStep}
                imageData={{
                  DocType: 'proposal_medical', TranId: '1', module: 'medical', dms_status: 'N',
                  screenName: 'DMS', uploadscrn: 'MEDICAL'
                }}
              />
              {medicalId && editMRVId &&
                <CustomMediaUpload imageData={{
                  DocType: 'proposal_medical', TranId: editMRVId, module: 'medical', dms_status: 'N',
                  screenName: 'DMS', uploadscrn: 'MEDICAL'
                }} />
              }
            </>
          )}
        </div>
        {hasValidRowData(rowData) && (
          <div className='col-span-2 p-3 border_left_divider'>
            <MRVListingQuotation
              root={root}
              tableColumn={columnData}
              tableData={rowData}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              selectedRow={editMRVId}
              action={action}
              isView={isView}
              isEdit={isEdit}
              isDelete={isDelete}
              freeze={freeze}
              handleCardActions={handleCardActions}
              isPremCalc={isPremCalc}
            />
          </div>
        )}
      </div>
      {deleteConfirmation && <ConfirmationModal open={deleteConfirmation} handleClose={handleClose} />}
      {openModal && (
        <MRVModal
          isPremCalc={isPremCalc}
          subId={editMRVId}
          tranId={tranId}
          open={openModal}
          modalTitle={modalType}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default MrvQuotation;
