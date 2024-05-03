import { Reducer, combineReducers } from "redux";
import {reducer,searchReducer} from "./reducers";
import cartReducer from "./cartReducer";
import favouritesReducer from "./favouritesReducer";
import { types } from "./types";

const RootReducer  :  Reducer<types>=combineReducers({
    reducer,
    searchReducer,
    cartReducer,
    favouritesReducer
})

export default RootReducer