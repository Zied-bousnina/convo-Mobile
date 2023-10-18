import { SET_IS_SECCESS, SET_mail_SENT } from "../types"



const initialState = {
  
    MailSent: false,
   
    
    
    
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_mail_SENT:
            return {
                ...state,
                MailSent: action.payload
                // isLoading: isEmpty(action.payload),
               

            }
        
        default:
            return state
    }

}


