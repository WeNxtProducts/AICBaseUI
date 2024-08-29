import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 id: '',
};

const ReceiptSlices = createSlice({
 name: 'ReceiptSlices',
 initialState,
 reducers: {
  setReceiptId: (state, action) => {
   state.id = action.payload;
  },
 },
});

export const { setReceiptId } = ReceiptSlices.actions;

export default ReceiptSlices.reducer;
