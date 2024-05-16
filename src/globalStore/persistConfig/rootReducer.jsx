import { combineReducers } from 'redux';
import menuSelected from '../slices/MenuSlices';
import tokenAndMenuList from '../slices/TokenAndMenuList';
import stepperData from '../slices/StepperData';
import IdSlices from '../slices/IdSlices';

const rootReducer = combineReducers({
 menuSelected: menuSelected,
 tokenAndMenuList: tokenAndMenuList,
 stepperData: stepperData,
 id: IdSlices,
});

export default rootReducer;
