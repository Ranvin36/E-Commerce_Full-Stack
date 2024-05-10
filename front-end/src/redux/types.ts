import {Reducer} from 'redux'
import {reducer,searchReducer,cartReducer} from "./reducers";
import favouritesReducer from './favouritesReducer';

export type types ={
    reducer: ReturnType<typeof reducer>;
    searchReducer: ReturnType<typeof searchReducer>;
    cartReducer: ReturnType<typeof cartReducer>;
    favouritesReducer: ReturnType<typeof favouritesReducer>;
}