import { createSlice } from '@reduxjs/toolkit';
import { quoteSteps } from '../../pages/quote/QuoteConstant';

const initialState = {
    tranId: '',
    quotationNo: '',
    stepperIndex: 0,
    compQuote: false,
    stepper_3: '',
    basicInfoForm: null,
    dropDown: null,
    custAssuredDetails: null,
    currentAddress: null,
    residenceAddress: null,
    nomineeDetails: null,
    listOfBenefits: [],
    premiumSummary: {
        totalSumAssured: 0,
        totalMonthlyPrem: 0,
    },
    loader: false,
    custDetailId: null,
    nomineeId: null,
    sameAddress: false,
    payStepper: 0,
    payMethod: 1,
    payFinish: false,
    showSignBox: false,
    quoteSteps: quoteSteps
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
        setLoader: (state, action) => {
            state.loader = action.payload;
        },
        setCustDetailId: (state, action) => {
            state.custDetailId = action.payload;
        },
        setCurrentAddress: (state, action) => {
            state.currentAddress = action.payload;
        },
        setResidenceAddress: (state, action) => {
            state.residenceAddress = action.payload;
        },
        setNomineeDetails: (state, action) => {
            state.nomineeDetails = action.payload;
        },
        setNomineeId: (state, action) => {
            state.nomineeId = action.payload;
        },
        setSameAddress: (state, action) => {
            state.sameAddress = action.payload;
        },
        setPayStepper: (state, action) => {
            state.payStepper = action.payload;
        },
        setPayMethod: (state, action) => {
            state.payMethod = action.payload;
        },
        setPayFinish: (state, action) => {
            state.payFinish = action.payload;
        },
        setQuotationNo: (state, action) => {
            state.quotationNo = action.payload;
        },
        setShowSignBox: (state, action) => {
            state.showSignBox = action.payload;
        },
        setQuoteStepStatus: (state, action) => {
            const step = state.quoteSteps.find(step => step.id === action.payload);
            if (step) {
                step.status = true;
            }
        },
        clearQuote: (state) => {
            state.tranId = '';
            state.stepperIndex = 0;
            state.compQuote = false;
            state.stepper_3 = '';
            state.basicInfoForm = null;
            state.dropDown = null;
            state.custAssuredDetails = null;
            state.currentAddress = null;
            state.residenceAddress = null;
            state.nomineeDetails = null;
            state.listOfBenefits = [];
            state.premiumSummary = {
                totalSumAssured: 0,
                totalMonthlyPrem: 0
            };
            state.loader = false;
            state.custDetailId = null;
            state.nomineeId = null;
            state.sameAddress = false;
            state.payStepper = 0;
            state.payMethod = 1;
            state.payFinish = false;
            state.quotationNo = '';
            state.showSignBox = false;
            state.quoteSteps = quoteSteps
        }
    },
});

export const { setStepperIndex, setComQuote, setStepper3
    , setBasicInfoForm, setDropDown, setCustAssuredDetails,
    setListOfBenefits, setBenefitsSA, setPremiumSummary, setTranId,
    setLoader, setCustDetailId,
    setCurrentAddress, setResidenceAddress, setNomineeDetails,
    setNomineeId, setSameAddress, setPayStepper, setPayMethod,
    setPayFinish, setQuotationNo, clearQuote,
    setShowSignBox, setQuoteStepStatus
} = QuoteSlices.actions;

export default QuoteSlices.reducer;
