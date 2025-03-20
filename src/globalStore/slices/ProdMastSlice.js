import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    id: 'K12',
};

const ProdMastSlices = createSlice({
    name: 'ProdMastSlices',
    initialState,
    reducers: {
        setProdMastId: (state, action) => {
            state.id = action.payload;
        },
    },
});

export const { setProdMastId } = ProdMastSlices.actions;

export default ProdMastSlices.reducer;
