import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from './favoriteActionTypes';
const initialState = [];

const favoriteReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        // case ADD_TO_FAVORITE:
        //     return [...state.filter(fav => fav.pokeId !== payload.pokeId), { ...payload, favorite: true },];
        // case REMOVE_FROM_FAVORITE:
        //     return [...state.filter(fav => fav.pokeId !== payload.pokeId)];
        default:
            return state;
    }
}

export default favoriteReducer;