
import isEmpty from "../../utils/isEmpty"
import { SET_ERRORS, SET_USER, SET_LOADING, SET_CURRENT_ACCESS } from "../types"

const initialState = {
    access: {},
    
    
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_ACCESS:
            return {
                ...state,
               
                access: action.payload,
                

            }
        
        default:
            return state
    }

}


