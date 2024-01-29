/* eslint-disable prettier/prettier */


import {   SET_MES_MISSIONS } from "../types"

const initialState = {
    mission: [],


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_MES_MISSIONS:
            return {
                ...state,

                mission: action.payload,


            }

        default:
            return state
    }

}


