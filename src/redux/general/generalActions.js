import { ADD_DATA } from './generalActionTypes'

export const addData = (data) => {
    return {
        type: ADD_DATA,
        payload: data
    }
}


