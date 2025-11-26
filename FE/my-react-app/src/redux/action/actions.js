import { STORE_USER_TABLE } from "./type"

export const storeUserTable = (userData)=>{
    return {
        type: STORE_USER_TABLE,
        payload: {userData}
    }
}