

import {   SET_MISSIONS } from "../types"

const initialState = {
    missions: [],


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_MISSIONS:
            return {
                ...state,

                missions: action.payload,


            }

        default:
            return state
    }

}


