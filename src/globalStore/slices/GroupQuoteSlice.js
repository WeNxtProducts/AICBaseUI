/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tranId: '',
    stepperIndex: 0,
    loader: false,
    basicInfoForm: null,
    dropDown: null
};

const GroupQuoteSlices = createSlice({
    name: 'GroupQuoteSlices',
    initialState,
    reducers: {
        setTranId: (state, action) => {
            state.tranId = action.payload;
        },
        setStepperIndex: (state, action) => {
            state.stepperIndex = action.payload;
        },
        setLoader: (state, action) => {
            state.loader = action.payload;
        },
        setBasicInfoForm: (state, action) => {
            state.basicInfoForm = action.payload;
        },
        setDropDown: (state, action) => {
            state.dropDown = action.payload;
        },
        clearGroupQuote: (state) => {
            state.prodCode = '',
                state.planCode = '',
                state.tranId = '',
                state.stepperIndex = 0
        }
    },
});

export const { setTranId, setStepperIndex, clearGroupQuote,
    setLoader, setBasicInfoForm,
    setDropDown } = GroupQuoteSlices.actions;

export default GroupQuoteSlices.reducer;
