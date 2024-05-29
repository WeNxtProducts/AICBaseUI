import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 id: '',
 formValues: {},
};

const IdSlices = createSlice({
 name: 'IdSlices',
 initialState,
 reducers: {
  setCurrentID: (state, action) => {
   state.id = action.payload;
  },
  setFormValues: (state, action) => {
   state.formValues = action.payload;
  },
 },
});

export const { setCurrentID, setFormValues } = IdSlices.actions;

export default IdSlices.reducer;
