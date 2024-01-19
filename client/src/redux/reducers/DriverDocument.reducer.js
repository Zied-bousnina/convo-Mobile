
import isEmpty from "../../utils/isEmpty"
import {  SET_DOCUMENT } from "../types"

const initialState = {

    document: {},

}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_DOCUMENT:
            return {
                ...state,

                document: action.payload
            }

        default:
            return state
    }

}


