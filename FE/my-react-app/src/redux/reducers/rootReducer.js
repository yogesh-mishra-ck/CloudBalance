
import { STORE_USER_TABLE } from "../action/type"

const initialState = {
    users: []
}
export const RootReducer = (state = initialState, action)=>{
    switch(action.type){
        case STORE_USER_TABLE: 
            return {
                users: action.payload.userData 
            }

        default:
            return state;
    }
}