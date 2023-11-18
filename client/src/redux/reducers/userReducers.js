
import isEmpty from "../../utils/isEmpty"
import {  SET_CURRENT_USER } from "../types"

const initialState = {

    user: {},

}

export default function(state = initialState, action) {
    // console.log(action)
    switch(action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,

                user: action.payload
            }

        default:
            return state
    }

}


