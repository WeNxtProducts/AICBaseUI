import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stepperIndex: 0,
};

const QuoteSlices = createSlice({
    name: 'QuoteSlices',
    initialState,
    reducers: {
        setStepperIndex: (state, action) => {
            state.stepperIndex = action.payload;
        },
    },
});

export const { setStepperIndex } = QuoteSlices.actions;

export default QuoteSlices.reducer;
