



import { SET_EN_ROUTE } from "../types"


const initialState = {
    enRoute:false


}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_EN_ROUTE:
            return {
                ...state,
                // AllUsers: action.payload.AllUsers,
                enRoute: action.payload,

            }

        default:
            return state
    }

}


