
import isEmpty from "../../utils/isEmpty"
import { SET_ERRORS, SET_USER, SET_LOADING } from "../types"

const initialState = {
    isConnected: false,
    isLoading: false,
    isDriver: false,
    isVerified: false,
    driverIsVerified:false,

    ifBlocked:true,
    user: {},



}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_USER:
            return {
                ...state,
                isConnected: !isEmpty(action.payload),
                user: action.payload,
                isLoading: isEmpty(action.payload),
                driverIsVerified:action.payload.driverIsVerified,


                isDriver: action.payload?.role === "DRIVER",

                isVerified: action.payload?.verified,

            }

        default:
            return state
    }

}


