import {combineReducers} from "redux"
import { AdminApiCrudReducer } from "./AdminApiCrudReducer"

export const rootreducer = combineReducers({
    api:AdminApiCrudReducer
})