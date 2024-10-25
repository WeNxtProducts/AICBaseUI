import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 tranId: '',
};

const ReInsuranceSlices = createSlice({
 name: 'ReInsuranceSlices',
 initialState,
 reducers: {
  setReInsuranceId: (state, action) => {
   state.tranId = action.payload;
  },
 },
});

export const { setReInsuranceId } = ReInsuranceSlices.actions;

export default ReInsuranceSlices.reducer;
