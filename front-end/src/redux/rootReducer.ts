import { Reducer, combineReducers } from "redux";
import reducer from "./reducers";
import { types } from "./types";

const RootReducer  :  Reducer<types>=combineReducers({
    reducer
})

export default RootReducer