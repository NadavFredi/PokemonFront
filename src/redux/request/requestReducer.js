import { FETCH_ALL, FETCH_FAILED, FETCH_SINGLE, FETCH_SUCCEED } from './requestActionTypes'
const initialState = { data: [], loading: false };


const requestReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case FETCH_ALL:
        case FETCH_SINGLE:
            return { data: state.data, loading: true }
        case FETCH_FAILED:
            return { data: state.data, loading: false }
        case FETCH_SUCCEED:
            return { data: payload, loading: false }
        default:
            return state;
    }
}

export default requestReducer;