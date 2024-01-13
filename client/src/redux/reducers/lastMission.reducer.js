/* eslint-disable prettier/prettier */


import {   SET_LAST_MISSION } from "../types"

const initialState = {
    lastMission: [],


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_LAST_MISSION:
            return {
                ...state,

                lastMission: action.payload,


            }

        default:
            return state
    }

}


