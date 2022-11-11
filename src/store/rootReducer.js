import { combineReducers } from 'redux';
import userSlice from "./slices/userSlice";
import employeesSlice from './slices/employeesSlice';
import modalSlice from './slices/modalSlice';
import selectedEmployeeSlice from './slices/selectedEmployeeSlice';


const rootReducer = combineReducers({
    user: userSlice,
    employees: employeesSlice,
    modal: modalSlice,
    selectedEmployee: selectedEmployeeSlice
});

export default rootReducer;