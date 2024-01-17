/* eslint-disable prettier/prettier */


import {   SET_FACTURES } from "../types"

const initialState = {
    factures: [],


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_FACTURES:
            return {
                ...state,

                factures: action.payload,


            }

        default:
            return state
    }

}


