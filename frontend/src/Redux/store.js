import { legacy_createStore , combineReducers , applyMiddleware } from "redux";
import {reducer as appReducer} from "../Redux/reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({appReducer})

export const store = legacy_createStore(rootReducer,applyMiddleware(thunk));