

import {   SET_BINS_BY_MUNICIPAL } from "../types"

const initialState = {
    BinListByMunicipal: {},
    
    
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_BINS_BY_MUNICIPAL:
            return {
                ...state,
               
                BinListByMunicipal: action.payload,
                

            }
        
        default:
            return state
    }

}


