

import {   SET_BINS } from "../types"

const initialState = {
    fetchBins: [],
    
    
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_BINS:
            return {
                ...state,
               
                fetchBins: action.payload,
                

            }
        
        default:
            return state
    }

}


