import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 POL_NO: '',
 CustCode: '',
};

const UnderWriterSlices = createSlice({
 name: 'UnderWriterSlices',
 initialState,
 reducers: {
  setPolNum: (state, action) => {
   state.POL_NO = action.payload;
  },
  setCustCode: (state, action) => {
   state.CustCode = action.payload;
  },
 },
});

export const { setPolNum, setCustCode } = UnderWriterSlices.actions;

export default UnderWriterSlices.reducer;
