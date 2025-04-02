/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    prodCode: '',
    planCode: '',
    tranId: '',
    stepperIndex: 0,
};

const GroupQuoteSlices = createSlice({
    name: 'GroupQuoteSlices',
    initialState,
    reducers: {
        setProdCode: (state, action) => {
            state.prodCode = action.payload;
        },
        setPlanCode: (state, action) => {
            state.planCode = action.payload;
        },
        setTranId: (state, action) => {
            state.tranId = action.payload;
        },
        setStepperIndex: (state, action) => {
            state.stepperIndex = action.payload;
        },
        clearGroupQuote: (state) => {
            state.prodCode = '',
                state.planCode = '',
                state.tranId = '',
                state.stepperIndex = 0
        }
    },
});

export const { setProdCode, setPlanCode, setTranId,
    setStepperIndex, clearGroupQuote } = GroupQuoteSlices.actions;

export default GroupQuoteSlices.reducer;
