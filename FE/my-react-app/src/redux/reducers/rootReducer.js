
// import { loggedInUserInfo } from "../action/actions"
import { RESET_STORE, SET_LOGGEDIN_USERINFO, STORE_USER_TABLE } from "../action/type"

const initialState = {
    users: [],
    loggedInUser: {
        firstName: "",
        lastName: "",
        role: "",
        id:""
    }
}
export const RootReducer = (state = initialState, action)=>{
    switch(action.type){
        case STORE_USER_TABLE: 
            return {
                ...state,
                users: action.payload.userData 
            }

        case RESET_STORE:
            return {
                ...state,
                users: []
            }

        case SET_LOGGEDIN_USERINFO:
            return {
                ...state,
                loggedInUser: {
                    firstName: action.payload.loggedInUser.firstName,
                    lastName: action.payload.loggedInUser.lastName,
                    role: action.payload.loggedInUser.role,
                    id: action.payload.loggedInUser.id
                }
            }

        default:
            return state;
    }
}