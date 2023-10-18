

import {  SET_ALL_BINS } from "../types"

const initialState = {
    bins: {},
    
    
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_ALL_BINS:
            return {
                ...state,
               
                bins: action.payload,
                

            }
        
        default:
            return state
    }

}


