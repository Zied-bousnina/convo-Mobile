

import {  SET_CURRENT_USER2 } from "../types"

const initialState = {
    users: {}


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_USER2:
            return {
                ...state,
                users: action.payload

            }

        default:
            return state
    }

}


