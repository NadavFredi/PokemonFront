import { ADD_DATA, ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from './generalActionTypes'

export const addData = (data) => {
    return {
        type: ADD_DATA,
        payload: data
    }
}

export const addToFavorite = (cardData) => {
    return {
        type: ADD_TO_FAVORITE,
        payload: cardData
    }
}

export const removeFromFavorite = (cardId) => {
    return {
        type: REMOVE_FROM_FAVORITE,
        payload: cardId
    }
}


