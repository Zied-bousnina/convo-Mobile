

import { SET_DEMANDES_MUNICIPAL } from "../types"


const initialState = {
    AllUsers:{},
    usersInProgress:{}
    
    
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_DEMANDES_MUNICIPAL:
            return {
                ...state,
                // AllUsers: action.payload.AllUsers,
                usersInProgress: action.payload,

            }
        
        default:
            return state
    }

}


