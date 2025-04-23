import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    polTranId: '',
    pol_no: ''
};

const CustPolSlice = createSlice({
    name: 'CustPolSlice',
    initialState,
    reducers: {
        setPolNo: (state, action) => {
            state.pol_no = action.payload;
        },
        setPolTranId: (state, action) => {
            state.polTranId = action.payload;
        }
    },
});

export const {
    setPolNo,
    setPolTranId
} = CustPolSlice.actions;

export default CustPolSlice.reducer;
