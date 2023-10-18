import { SET_IS_SECCESS, SET_NOT_SUCCESS } from "../types"



const initialState = {
  
    NotSuccess: false,
   
    
    
    
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_NOT_SUCCESS:
            return {
                ...state,
                NotSuccess: action.payload
                // isLoading: isEmpty(action.payload),
               

            }
        
        default:
            return state
    }

}


