import {combineReducers} from "redux"
import { AdminApiCrudReducer } from "./AdminApiCrudReducer"
import { PropertyApiCrudReducer } from "./PropertyApiCrudReducer"

export const rootreducer = combineReducers({
    api:AdminApiCrudReducer,
    propertyapi:PropertyApiCrudReducer
})