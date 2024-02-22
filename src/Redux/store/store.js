import { applyMiddleware, createStore } from "redux";
import { rootreducer } from "../reducer/Rootreducer";
import { thunk } from "redux-thunk";


export const store = createStore(rootreducer,applyMiddleware(thunk))