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

const rootReducer = combineReducers({
    menuSelected: menuSelected,
    tokenAndMenuList: tokenAndMenuList,
    stepperData: stepperData,
    id: IdSlices,
    UWId: UnderWriterSlices,
    Receipt: ReceiptSlices,
    Endo: EndorsementSlices,
    SurrId: SurrenderMaturitySlices,
    rules: RulesSlices
});

export default rootReducer;
