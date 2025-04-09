import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    prodCode: '',
    planCode: '',
};

const QuoteProdPlanSlices = createSlice({
    name: 'QuoteProdPlanSlices',
    initialState,
    reducers: {
        setProdCode: (state, action) => {
            state.prodCode = action.payload;
        },
        setPlanCode: (state, action) => {
            state.planCode = action.payload;
        },
    },
});

export const { setProdCode, setPlanCode } = QuoteProdPlanSlices.actions;

export default QuoteProdPlanSlices.reducer;
