import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import RootReducer from './rootReducer';
import {persistStore,persistReducer} from "redux-persist"
import storage from "redux-persist/lib/storage"


const persistConfig=({
    key:'root',
    storage,
})

const persistReducers = persistReducer(persistConfig,RootReducer)
const store = createStore(persistReducers);
export const persistor = persistStore(store)
export default store;
