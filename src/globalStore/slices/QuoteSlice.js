import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    prodCode: '',
    planCode: '',
    tranId: '',
    stepperIndex: 0,
    compQuote: false,
    stepper_3: '',
    basicInfoForm: null,
    dropDown: null,
    custAssuredDetails: null,
    listOfBenefits: [],
    premiumSummary: {
        totalSumAssured: 0,
        totalMonthlyPrem: 0,
    },
    loader: false
};

const QuoteSlices = createSlice({
    name: 'QuoteSlices',
    initialState,
    reducers: {
        setTranId: (state, action) => {
            state.tranId = action.payload;
        },
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
        },
        setListOfBenefits: (state, action) => {
            state.listOfBenefits = action.payload;
        },
        setBenefitsSA: (state, action) => {
            const { index, newDescription, key } = action.payload;
            if (key === 'listOfBenefits')
                state.listOfBenefits[index].QQAC_FC_SA = newDescription;
            else if (key === 'QQAC_SELECT_YN') {
                const tempSelectYN = state.listOfBenefits[index].QQAC_SELECT_YN === 'Y' ? 'N' : 'Y'
                state.listOfBenefits[index].QQAC_SELECT_YN = tempSelectYN;
            }
        },
        setPremiumSummary: (state, action) => {
            state.premiumSummary = action.payload;
        },
        setProdCode: (state, action) => {
            state.prodCode = action.payload;
        },
        setPlanCode: (state, action) => {
            state.planCode = action.payload;
        },
        setLoader: (state, action) => {
            state.loader = action.payload;
        }
    },
});

export const { setStepperIndex, setComQuote, setStepper3
    , setBasicInfoForm, setDropDown, setCustAssuredDetails,
    setListOfBenefits, setBenefitsSA, setPremiumSummary, setTranId,
    setProdCode, setPlanCode, setLoader
} = QuoteSlices.actions;

export default QuoteSlices.reducer;
