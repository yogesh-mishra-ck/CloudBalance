import { createStore } from "redux";
import { RootReducer } from "../reducers/rootReducer";

export const store = createStore(RootReducer);