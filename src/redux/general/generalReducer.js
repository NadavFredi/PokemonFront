import { ADD_DATA, ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from './generalActionTypes'
const initialState = [];
const FAVORITE_NUMBER = 6;
const general = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case ADD_DATA:
            return [...state, payload];
        case ADD_TO_FAVORITE:
            const favs = state.filter(fav => fav.favorite === true);
            if (favs.length >= FAVORITE_NUMBER) return state;
            return [...state.filter(fav => fav.id !== payload.id), { ...payload, favorite: true }];
        case REMOVE_FROM_FAVORITE:
            return [...state.filter(fav => fav.id !== payload.id), { ...payload, favorite: false }];
        default:
            return state;
    }

}
export default general;