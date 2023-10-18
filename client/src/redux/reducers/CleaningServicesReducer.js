

import { SET_DEMANDES_MUNICIPAL, SET_REQUESTS_CLEANING, SET_REQUESTS_SENT } from "../types"


const initialState = {
    requestsCleaning: {},
    requestsSent: {}
    
    
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_REQUESTS_CLEANING:
            return {
                ...state,
                // AllUsers: action.payload.AllUsers,
                requestsCleaning: action.payload,

            }

        
        case SET_REQUESTS_SENT: 
            return {
                ...state,     
                requestsSent: action.payload
            }

        
        default:
            return state
    }

}


