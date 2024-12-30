import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 tranId: '',
 POL_NO: '',
 CUST_CODE: '',
};

const EndorsementSlices = createSlice({
 name: 'EndorsementSlices',
 initialState,
 reducers: {
  setEndoId: (state, action) => {
   state.tranId = action.payload;
  },
  setPol: (state, action) => {
   state.POL_NO = action.payload;
  },
  setCustCode: (state, action) => {
   state.CUST_CODE = action.payload;
  },
 },
});

export const { setEndoId, setPol, setCustCode } = EndorsementSlices.actions;

export default EndorsementSlices.reducer;
