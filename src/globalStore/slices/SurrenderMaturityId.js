import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 tranId: '',
};

const SurrenderMaturitySlices = createSlice({
 name: 'SurrenderMaturitySlices',
 initialState,
 reducers: {
  setSurrMatId: (state, action) => {
   state.tranId = action.payload;
  },
 },
});

export const { setSurrMatId } = SurrenderMaturitySlices.actions;

export default SurrenderMaturitySlices.reducer;
