import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 tranId: '',
 POL_NO: '',
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
 },
});

export const { setEndoId, setPol } = EndorsementSlices.actions;

export default EndorsementSlices.reducer;
