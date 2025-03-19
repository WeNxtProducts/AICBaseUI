import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stepperIndex: 0,
    compQuote: false
};

const QuoteSlices = createSlice({
    name: 'QuoteSlices',
    initialState,
    reducers: {
        setStepperIndex: (state, action) => {
            state.stepperIndex = action.payload;
        },
        setComQuote: (state, action) => {
            state.compQuote = action.payload;
        }
    },
});

export const { setStepperIndex, setComQuote } = QuoteSlices.actions;

export default QuoteSlices.reducer;
