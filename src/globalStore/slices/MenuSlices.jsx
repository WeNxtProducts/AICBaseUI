/* eslint-disable react-refresh/only-export-components */
import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const MenuSlices = createSlice({
 name: 'MenuSlices',
 initialState,
 reducers: {
  setMenu: (state, action) => {
   state.splice(0, state.length, ...action.payload);
  },
 },
});

export const { setMenu } = MenuSlices.actions;

export default MenuSlices.reducer;
