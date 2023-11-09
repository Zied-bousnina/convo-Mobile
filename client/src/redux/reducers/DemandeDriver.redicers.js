

import {   SET_DEMANDES } from "../types"

const initialState = {
    demandes: [],


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_DEMANDES:
            return {
                ...state,

                demandes: action.payload,


            }

        default:
            return state
    }

}


