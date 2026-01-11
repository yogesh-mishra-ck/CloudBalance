
// import { loggedInUserInfo } from "../action/actions"
import { RESET_STORE, SET_LOGGEDIN_USERINFO, STORE_CHART_DATA, STORE_COST_GROUPBY, STORE_USER_TABLE } from "../action/type"

const initialState = {
    users: [],
    loggedInUser: {
        firstName: "",
        lastName: "",
        role: "",
        id:""
    },
    chartData:{},
    groupByValue: "SERVICE"
}
export const RootReducer = (state = initialState, action)=>{
    switch(action.type){
        case STORE_USER_TABLE: 
            return {
                ...state,
                users: action.payload.userData 
            }

        case RESET_STORE:
            return initialState

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

        case STORE_CHART_DATA:
            return {
                ...state,
                chartData: action.payload.chartData
            }

        case STORE_COST_GROUPBY:
            return {
                ...state,
                groupByValue: action.payload.groupByValue
            }
        default:
            return state;
    }
}