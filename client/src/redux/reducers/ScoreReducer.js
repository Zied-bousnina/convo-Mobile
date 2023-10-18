
import isEmpty from "../../utils/isEmpty"
import {  SET_SCORES } from "../types"

const initialState = {
    score: {},


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_SCORES:
            return {
                ...state,

                score: action.payload,


            }

        default:
            return state
    }

}


