

import { SET_INFO_DRIVER } from "../types"


const initialState = {
    InfoDriver:{},
    // usersInProgress:{}


}

export default function(state = initialState, action) {

    switch(action.type) {
        case SET_INFO_DRIVER:
            console.log("sssswitch**********", action.payload )
            return {
                ...state,
                // AllUsers: action.payload.AllUsers,
                InfoDriver: action.payload,

            }

        default:
            return state
    }

}


