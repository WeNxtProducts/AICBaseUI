import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    graphType: 'S',
    fromDate: null,
    toDate: null,
};

const DashboardSlice = createSlice({
    name: 'dashboardSlice',
    initialState,
    reducers: {
        setGraphType: (state, action) => {
            state.graphType = action.payload;
        },
        setDateRange: (state, action) => {
            const { fromDate, toDate } = action.payload;
            state.fromDate = fromDate;
            state.toDate = toDate;
        },
    },
});

export const {
    setGraphType,
    setDateRange
} = DashboardSlice.actions;

export default DashboardSlice.reducer;
