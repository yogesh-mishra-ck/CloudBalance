import { RESET_STORE, SET_LOGGEDIN_USERINFO, STORE_CHART_DATA, STORE_COST_GROUPBY, STORE_USER_TABLE } from "./type"

export const storeUserTable = (userData)=>{
    return {
        type: STORE_USER_TABLE,
        payload: {userData}
    }
}
export const resetStore = ()=>{
    return {
        type: RESET_STORE
    }
}

export const loggedInUserInfo = (loggedInUser)=>{
    return {
        type: SET_LOGGEDIN_USERINFO,
        payload: {loggedInUser}
    }
}

export const storeChartData = (chartData)=>{
    return {
        type: STORE_CHART_DATA,
        payload : { chartData }
    }
}
export const storeCostGroupBy  = (groupByValue)=>{
    return {
        type: STORE_COST_GROUPBY,
        payload: { groupByValue }
    }
}