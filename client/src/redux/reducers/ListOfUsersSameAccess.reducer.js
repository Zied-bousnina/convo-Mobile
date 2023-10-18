

import {   SET_SOME_ACCESS_LIST_USERS } from "../types"

const initialState = {
    SomeAccess: [],
    
    
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_SOME_ACCESS_LIST_USERS:
            return {
                ...state,
               
                SomeAccess: action.payload,
                

            }
        
        default:
            return state
    }

}


