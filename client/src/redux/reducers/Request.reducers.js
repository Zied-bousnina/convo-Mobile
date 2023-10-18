
import isEmpty from "../../utils/isEmpty"
import { SET_REQUEST } from "../types"


const initialState = {
    
    request: {},
    requestIsEmpty: false

 
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_REQUEST:
            return {
                ...state,
                requestIsEmpty: isEmpty(action.payload),
                request: action.payload            
            }
        
        default:
            return state
    }

}


