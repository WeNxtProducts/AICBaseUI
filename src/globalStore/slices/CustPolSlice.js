import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pol_no: ''
};

const CustPolSlice = createSlice({
    name: 'CustPolSlice',
    initialState,
    reducers: {
        setPolNo: (state, action) => {
            state.pol_no = action.payload;
        },
    },
});

export const {
    setPolNo
} = CustPolSlice.actions;

export default CustPolSlice.reducer;
