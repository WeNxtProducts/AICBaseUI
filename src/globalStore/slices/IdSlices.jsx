import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 id: '',
};

const IdSlices = createSlice({
 name: 'IdSlices',
 initialState,
 reducers: {
  setCurrentID: (state, action) => {
   state.id = action.payload;
  },
 },
});

export const { setCurrentID } = IdSlices.actions;

export default IdSlices.reducer;
