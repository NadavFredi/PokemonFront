import { combineReducers } from 'redux'

import generalReducer from '../general/generalReducer';

const rootReducer = combineReducers({
    generalReducer,
});

export default rootReducer;
