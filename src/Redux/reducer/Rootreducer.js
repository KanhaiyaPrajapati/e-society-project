import {combineReducers} from "redux"
import { AdminApiCrudReducer } from "./AdminApiCrudReducer"
import { PropertyApiCrudReducer } from "./PropertyApiCrudReducer"
import { BlocksApiCrudReducer } from "../reducer/BlocksApiCrudReducer"
import { UnitsApiCrudReducer } from "./UnitsApiCrudReducer"
import { ManagerApiCrudReducer } from "./ManagerApiCrudReducer"


export const rootreducer = combineReducers({
    api:AdminApiCrudReducer,
    propertyapi:PropertyApiCrudReducer,
    Blockapi:BlocksApiCrudReducer,
    Unitsapi:UnitsApiCrudReducer,
    ManagerApi:ManagerApiCrudReducer
})