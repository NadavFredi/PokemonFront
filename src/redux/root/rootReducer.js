import { combineReducers } from 'redux'

import generalReducer from '../general/generalReducer';
import favoriteReducer from '../favorite/favoriteReducer';

const rootReducer = combineReducers({
    generalReducer,
    favoriteReducer
});

export default rootReducer;
