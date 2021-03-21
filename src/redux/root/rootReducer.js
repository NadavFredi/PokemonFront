import { combineReducers } from 'redux'

import generalReducer from '../general/generalReducer';
import requestReducer from '../request/requestReducer';

const rootReducer = combineReducers({
    generalReducer,
    requestReducer
});

export default rootReducer;
