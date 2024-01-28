/* eslint-disable prettier/prettier */

import isEmpty from "../../utils/isEmpty"
import { SET_ERRORS, SET_USER, SET_LOADING, SET_FIRST_LOGIN, SET_DRIVER_VERIFIED } from "../types"

const initialState = {
    isConnected: false,
    isLoading: false,
    isDriver: true,
    isVerified: false,
    driverIsVerified:false,

    ifBlocked:true,
    user: {},
    isFirstTime:false,
    driverDocumentsIsVerified:false,



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
                isFirstTime : action.payload?.firstLogin

            }

            case SET_FIRST_LOGIN:
                return {
                    ...state,
                    isFirstTime: action.payload
                }

            case SET_DRIVER_VERIFIED:
                return {
                    ...state,
                    driverDocumentsIsVerified: action.payload
                }

        default:
            return state
    }

}


