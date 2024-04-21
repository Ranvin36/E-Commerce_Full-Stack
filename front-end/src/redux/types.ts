import {Reducer} from 'redux'

import reducer from "./reducers";


export type types ={
    reducer: ReturnType<typeof reducer>;
}