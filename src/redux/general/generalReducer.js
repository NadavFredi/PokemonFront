import { ADD_DATA } from './generalActionTypes'

const initialState = [];

const general = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_DATA:
            return [...state, payload];
        default:
            return state;
    }

}
export default general;