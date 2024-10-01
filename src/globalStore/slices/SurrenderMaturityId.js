import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 tranId: '',
 surrRefNo: '',
};

const SurrenderMaturitySlices = createSlice({
 name: 'SurrenderMaturitySlices',
 initialState,
 reducers: {
  setSurrMatId: (state, action) => {
   state.tranId = action.payload;
  },
  setSurrRefNo: (state, action) => {
   state.surrRefNo = action.payload;
  },
 },
});

export const { setSurrMatId, setSurrRefNo } = SurrenderMaturitySlices.actions;

export default SurrenderMaturitySlices.reducer;
