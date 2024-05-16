import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 token: '',
 sidebarList: [],
 currentMenuId: {},
 userDetails: {},
};

const TokenAndMenuList = createSlice({
 name: 'TokenAndMenuList',
 initialState,
 reducers: {
  setToken: (state, action) => {
   state.token = action.payload;
  },
  setSidebarList: (state, action) => {
   state.sidebarList = action.payload;
  },
  setCurrentMenuId: (state, action) => {
   state.currentMenuId = action.payload;
  },
  setUserDetails: (state, action) => {
   state.userDetails = action.payload;
  },
 },
});

export const { setToken, setSidebarList, setCurrentMenuId, setUserDetails } =
 TokenAndMenuList.actions;

export default TokenAndMenuList.reducer;
