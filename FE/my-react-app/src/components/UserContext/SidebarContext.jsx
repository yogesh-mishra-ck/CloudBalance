import { createContext } from "react";

export const SidebarContext = createContext({
    isCollapsed: false,
    setIsCollapsed: ()=>{},
})