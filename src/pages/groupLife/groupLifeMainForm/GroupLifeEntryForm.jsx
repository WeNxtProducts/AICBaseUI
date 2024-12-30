import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { setFormValues } from '../../../globalStore/slices/IdSlices';
import { GroupLifeContext } from '../GroupLife';
import { sortObjectByPFDSeqNo } from './../../../components/commonHelper/SortBySequence';
import PolTagDisplay from '../../../components/polTagDisplay/PolTagDisplay';
import MainForm from '../../../components/mainForm/MainForm';
import useParamLov from '../../../components/useParamLov/useParamLov';

const GroupLifeEntryForm = () => {
    const dispatch = useDispatch();
    const { handleNext, id: tranId, GroupLifeJSON, dropDown, setDropDown } = useContext(GroupLifeContext);
    const { onSearch } = useParamLov();
    const [groupLifeEntry, setGroupLifeEntry] = useState(null);
    const [groupLifeEntryInitialValues, setGroupLifeInitialValues] = useState(null);

    const dataAssign = orderedData => {
        setGroupLifeInitialValues({ frontForm: orderedData?.frontForm });
        setGroupLifeEntry({ frontForm: orderedData?.frontForm });
        dispatch(setFormValues(orderedData));
    };

    const handleStateInit = value => {
        const orderedData = sortObjectByPFDSeqNo(value);
        dataAssign(orderedData);
    };

    useEffect(() => {
        handleStateInit(GroupLifeJSON);
    }, []);

    const handleChangeValue = async (value, path, setFieldValue, parent, values, currentData, col_name) => {
        setFieldValue(path, value);
    };

    const handleOnBlur = async (currentData, values, setFieldValue, val, label) => {
        const key = currentData?.PFD_COLUMN_NAME;
        console.log("key : ", key)
    };

    const handleOnSearch = async (currentData, values, setFieldValue, val) => {
        const key = currentData?.PFD_COLUMN_NAME;
        if (Object.prototype.hasOwnProperty.call(currentData, 'PFD_PARAM_4')) {
            if (['POL_CUST_CODE', 'POL_AGENT_CODE', 'POL_ASSR_CODE'].includes(key)) {
                if (val?.length > 0) {
                    const response = await onSearch(currentData?.PFD_PARAM_4, val);
                    setDropDown(prev => ({
                        ...prev,
                        [key]: response?.Data?.[key],
                    }));
                }
            }
        }
    };

    const onSubmit = async values => {
        console.log("values :", values)
        dispatch(setFormValues(values));
    };

    return (
        <div>
            <div className='flex items-center justify-between pl-1'>
                <div className='flex items-center'>
                    <p className='header-font'>{`Proposal Entry`}</p>
                    <PolTagDisplay label={'P100/456/9096'} />
                </div>
            </div>
            {groupLifeEntry !== null && (
                <div className='mt-3 mb-5'>
                    <MainForm
                        initialValues={groupLifeEntryInitialValues}
                        formRender={groupLifeEntry}
                        root='frontForm'
                        onSubmit={onSubmit}
                        handleChangeValue={handleChangeValue}
                        addOrUpdate={!!tranId}
                        lovList={dropDown}
                        freeze={false}
                        handleOnBlur={handleOnBlur}
                        handleOnSearch={handleOnSearch}
                    />
                </div>
            )}
        </div>
    )
}

export default GroupLifeEntryForm
