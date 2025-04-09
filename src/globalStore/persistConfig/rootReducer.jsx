import { combineReducers } from 'redux';
import menuSelected from '../slices/MenuSlices';
import tokenAndMenuList from '../slices/TokenAndMenuList';
import stepperData from '../slices/StepperData';
import IdSlices from '../slices/IdSlices';
import UnderWriterSlices from '../slices/UnderwriterId';
import ReceiptSlices from '../slices/ReceiptId';
import EndorsementSlices from '../slices/EndorsementId';
import SurrenderMaturitySlices from '../slices/SurrenderMaturityId';
import RulesSlices from '../slices/RulesSlices';
import ReInsuranceSlices from '../slices/ReInsuranceSlices';
import QuoteSlices from '../slices/QuoteSlice';
import ProdMastSlices from '../slices/ProdMastSlice'
import GroupQuoteSlices from '../slices/GroupQuoteSlice';
import QuoteProdPlanSlices from '../slices/QuoteProdPlanSlice';

const rootReducer = combineReducers({
    menuSelected: menuSelected,
    tokenAndMenuList: tokenAndMenuList,
    stepperData: stepperData,
    id: IdSlices,
    UWId: UnderWriterSlices,
    Receipt: ReceiptSlices,
    Endo: EndorsementSlices,
    SurrId: SurrenderMaturitySlices,
    rules: RulesSlices,
    reInsurance: ReInsuranceSlices,
    quote: QuoteSlices,
    grpQuote: GroupQuoteSlices,
    quoteProdPlanCode: QuoteProdPlanSlices,
    prodMast: ProdMastSlices
});

export default rootReducer;
