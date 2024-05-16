import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 currentStep: 0,
 stepperData: [],
};

const StepperData = createSlice({
 name: 'StepperData',
 initialState,
 reducers: {
  setCurrentStep: (state, action) => {
   state.currentStep = action.payload;
  },
  setStepperData: (state, action) => {
   state.stepperData = action.payload;
  },
 },
});

export const { setCurrentStep, setStepperData } = StepperData.actions;

export default StepperData.reducer;
