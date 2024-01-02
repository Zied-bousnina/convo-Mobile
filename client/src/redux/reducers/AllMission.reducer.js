/* eslint-disable prettier/prettier */


import {   SET_MISSIONV2 } from "../types"

const initialState = {
    mission: [],


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_MISSIONV2:
            return {
                ...state,

                mission: action.payload,


            }

        default:
            return state
    }

}


