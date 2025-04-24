import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    prodCode: '',
    planCode: '',
    life: '',
    from: ''
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
        setFrom: (state, action) => {
            state.from = action.payload;
        },
        clearQuote: (state) => {
            state.prodCode = '';
            state.planCode = '';
            state.life = '';
            state.from = '';
        }
    },
});

export const { setProdCode, setPlanCode, setLife, clearQuote, setFrom } = QuoteProdPlanSlices.actions;

export default QuoteProdPlanSlices.reducer;
