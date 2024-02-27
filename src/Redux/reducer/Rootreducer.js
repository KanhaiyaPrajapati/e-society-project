import {combineReducers} from "redux"
import { AdminApiCrudReducer, PropertyApiCrudReducer } from "./AdminApiCrudReducer"

export const rootreducer = combineReducers({
    api:AdminApiCrudReducer,
    propertyapi:PropertyApiCrudReducer
})