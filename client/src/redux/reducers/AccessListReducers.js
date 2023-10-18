
import isEmpty from "../../utils/isEmpty"
import { SET_ERRORS, SET_USER, SET_LOADING, SET_CURRENT_ACCESS, SET_CURRENT_ACCESS_LIST } from "../types"

const initialState = {
    accessList: {},
    
    
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_CURRENT_ACCESS_LIST:
            return {
                ...state,
               
                accessList: action.payload,
                

            }
        
        default:
            return state
    }

}


