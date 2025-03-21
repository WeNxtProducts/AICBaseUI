import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    stepperIndex: 0,
    compQuote: false,
    stepper_3: '',
    basicInfoForm: null,
    dropDown: null,
    custAssuredDetails: null
};

const QuoteSlices = createSlice({
    name: 'QuoteSlices',
    initialState,
    reducers: {
        setStepperIndex: (state, action) => {
            state.stepperIndex = action.payload;
        },
        setComQuote: (state, action) => {
            state.compQuote = action.payload;
        },
        setStepper3: (state, action) => {
            state.stepper_3 = action.payload;
        },
        setBasicInfoForm: (state, action) => {
            state.basicInfoForm = action.payload;
        },
        setDropDown: (state, action) => {
            state.dropDown = action.payload;
        },
        setCustAssuredDetails: (state, action) => {
            state.custAssuredDetails = action.payload;
        }
    },
});

export const { setStepperIndex, setComQuote, setStepper3
    , setBasicInfoForm, setDropDown, setCustAssuredDetails
} = QuoteSlices.actions;

export default QuoteSlices.reducer;
