import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 tranId: '',
 rePol: '',
};

const ReInsuranceSlices = createSlice({
 name: 'ReInsuranceSlices',
 initialState,
 reducers: {
  setReInsuranceId: (state, action) => {
   state.tranId = action.payload;
  },
  setReInsurancePolNo: (state, action) => {
   state.rePol = action.payload;
  },
 },
});

export const { setReInsuranceId, setReInsurancePolNo } = ReInsuranceSlices.actions;

export default ReInsuranceSlices.reducer;
