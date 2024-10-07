/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    rulesJSON: null
};

const RulesSlices = createSlice({
    name: 'RulesSlices',
    initialState,
    reducers: {
        setRulesJSON: (state, action) => {
            state.rulesJSON = action.payload;
        },
    },
});

export const {
    setRulesJSON
} = RulesSlices.actions;

export default RulesSlices.reducer;
