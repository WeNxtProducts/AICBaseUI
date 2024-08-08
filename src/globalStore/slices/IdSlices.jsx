import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 id: '',
 formValues: null,
 prodCode: '',
 freezeStatus: false,
 planCode: '',
};

const IdSlices = createSlice({
 name: 'IdSlices',
 initialState,
 reducers: {
  setCurrentID: (state, action) => {
   state.id = action.payload;
  },
  setProdCode: (state, action) => {
   state.prodCode = action.payload;
  },
  setPlanCode: (state, action) => {
   state.planCode = action.payload;
  },
  setFormValues: (state, action) => {
   state.formValues = action.payload;
  },
  setFreezeStatus: (state, action) => {
   state.freezeStatus = action.payload;
  },
 },
});

export const {
 setCurrentID,
 setFormValues,
 setProdCode,
 setFreezeStatus,
 setPlanCode,
} = IdSlices.actions;

export default IdSlices.reducer;
