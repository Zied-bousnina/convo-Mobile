
import isEmpty from "../../utils/isEmpty"
import { SET_IS_DRIVER_MODE } from "../types"

const initialState = {
    isDriver: false


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_IS_DRIVER_MODE:
            return {
                ...state,

                isDriver: action.payload,


            }

        default:
            return state
    }

}


