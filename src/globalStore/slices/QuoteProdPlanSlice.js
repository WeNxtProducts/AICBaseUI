import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    prodCode: '',
    planCode: '',
    life: ''
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
        setLife: (state, action) => {
            state.life = action.payload;
        },
        clearQuote: (state) => {
            state.prodCode = '';
            state.planCode = '';
            state.life = '';
        }
    },
});

export const { setProdCode, setPlanCode, setLife, clearQuote } = QuoteProdPlanSlices.actions;

export default QuoteProdPlanSlices.reducer;
