import { useState } from "react"
import { CostContextFilter } from "../../context/CostContext"

export const CostExplorerProvider = ({ children }) => {

    const [params, setParams] = useState({});

    return (
        <CostContextFilter.Provider value={{ params, setParams}}>
            { children }
        </CostContextFilter.Provider>
    )
}