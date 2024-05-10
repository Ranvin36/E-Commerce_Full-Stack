import { Reducer, combineReducers } from "redux";
import {reducer,searchReducer,categoryFilterReducer} from "./reducers";
import cartReducer from "./cartReducer";
import favouritesReducer from "./favouritesReducer";
import { types } from "./types";

const RootReducer  :  Reducer<types>=combineReducers({
    reducer,
    searchReducer,
    cartReducer,
    favouritesReducer,
    categoryFilterReducer
})

export default RootReducer