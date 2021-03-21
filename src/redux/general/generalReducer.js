import { ADD_DATA, ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from './generalActionTypes'
const initialState = [];
const FAVORITE_NUMBER = 6;
const general = (state = initialState, action) => {
    const { type, payload } = action;
    let newFavorites;
    switch (type) {
        case ADD_DATA:
            return [...state, payload];
        case ADD_TO_FAVORITE:
            let favs = state.filter(fav => fav.favorite === true);
            if (favs.length >= FAVORITE_NUMBER) return state;
            newFavorites = [...state.filter(fav => fav.id !== payload.id), { ...payload, favorite: true }]

            favs = state.filter(fav => fav.favorite === true);
            localStorage.setItem('favorites', JSON.stringify([...favs, payload]));
            return newFavorites;
        case REMOVE_FROM_FAVORITE:
            localStorage.setItem('favorites', JSON.stringify("moshe"));
            newFavorites = [...state.filter(fav => fav.id !== payload.id && fav.favorite)]
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
            return [...state.filter(fav => fav.id !== payload.id), { ...payload, favorite: false }];
        default:
            return state;
    }

}
export default general;