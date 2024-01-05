/* eslint-disable prettier/prettier */


import {   ACCEPTED_MISSIONS } from "../types"

const initialState = {
    mission: [],


}

export default function(state = initialState, action) {
    switch(action.type) {
        case ACCEPTED_MISSIONS:
            return {
                ...state,

                mission: action.payload,


            }

        default:
            return state
    }

}


