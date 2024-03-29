
import isEmpty from "../../utils/isEmpty"
import {  SET_BASIC_INFO } from "../types"

const initialState = {

    basicInfo: {},
    basicInfoIsEmpty: false
}

export default function(state = initialState, action) {
    // console.log("switch",action.payload )
    switch(action.type) {
        case SET_BASIC_INFO:
            return {
                ...state,
                basicInfoIsEmpty: isEmpty(action.payload),
                basicInfo: action.payload
            }

        default:
            return state
    }

}


